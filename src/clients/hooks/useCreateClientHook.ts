"use client";

import {
  GENERAL_LABELS,
  uploadImages,
  useNotificationStore
} from "@/src/utils";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { validateCreateClientData } from "../utils/validateCreateClientData";
import { createClientAction } from "../actions/clientActions";
import { setCookie } from "cookies-next";
import { CLIENT_LABELS, COOKIE_CLIENT_IMAGES } from "../utils/const";
import { ImagesToCreate } from "../interfaces/client-to-create.interface";

const INITIAL_STATE = {
  name: "",
  lastName: "",
  phoneNumber1: "",
  countryCode1: "",
  phoneNumber2: "",
  countryCode2: "",
  email: "",
  guarantor: "",
  workDirection: "",
  homeDirection: "",
  profession: "",
  idCard: ""
};

interface Props {
  initialImages: ImagesToCreate[];
}
export const useCreateClientHook = ({ initialImages = [] }: Props) => {
  const [formValues, setFormValues] = useState(INITIAL_STATE);
  const [images, setImages] = useState<ImagesToCreate[]>(initialImages);
  const showNotification = useNotificationStore(
    state => state.showNotification
  );
  const [loading, setLoading] = useState(false);
  const [showErrors, setShowErrors] = useState(false);

  const [loadingImages, setLoadingImages] = useState(false);

  const handleAddImages = async ({
    target: { files, name }
  }: ChangeEvent<HTMLInputElement>) => {
    if (loadingImages) return;

    setLoadingImages(true);

    const urls = await uploadImages(files, showNotification, true, () =>
      setLoadingImages(false)
    );

    if (urls.length === 0) return;

    setLoadingImages(false);

    setImages([
      ...images,
      ...urls.map(url => ({ url: url.url, type: name, name: url.name }))
    ]);
  };

  const handleDeleteImages = async (url: string) => {
    const key = url.split(".com/")[1];

    try {
      const response = await fetch(`/api/deleteImage?key=${key}`, {
        method: "DELETE"
      });
      await response.json();

      const newImages = images.filter(image => image.url !== url);

      setImages(newImages);
    } catch (error) {
      showNotification({
        type: "error",
        text: GENERAL_LABELS.IMAGES.ERROR.DELETE_IMAGE
      });
    }
  };

  const handleChange = (name: string, value: string) => {
    if (name === "email") {
      value = value.trim();
    } else if (name.includes("countryCode")) {
      value = Number(value) ? value.slice(0, 3) : "";
    }

    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateCreateClientData(formValues)) {
      setShowErrors(true);
      return;
    }

    setLoading(true);

    console.log(formValues);

    const { data, error, success } = await createClientAction({
      ...formValues,
      images
    });

    if (error) {
      showNotification({
        text: GENERAL_LABELS.ERRORS.NOTIFICATION_ERROR,
        type: "error"
      });
    } else if (success && data) {
      showNotification({
        text: CLIENT_LABELS.NOTIFICATIONS.CLIENT_CREATED,
        type: "success"
      });
      setFormValues(INITIAL_STATE);
    }

    setImages([]);
    setLoading(false);
    setShowErrors(false);
  };

  useEffect(() => {
    setCookie(COOKIE_CLIENT_IMAGES, JSON.stringify(images));
  }, [images]);

  return {
    showErrors,
    formValues,
    images,
    setImages,
    loadingImages,
    handleAddImages,
    handleDeleteImages,
    handleChange,
    handleSubmit,
    loading
  };
};
