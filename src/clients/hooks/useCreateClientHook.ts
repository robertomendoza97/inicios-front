"use client";

import {
  GENERAL_LABELS,
  uploadImages,
  useNotificationStore
} from "@/src/utils";
import { ChangeEvent, useState } from "react";

const INITIAL_STATE = {
  name: "",
  lastName: "",
  phone: "",
  countryCode: "",
  email: "",
  guarantor: "",
  workDirection: "",
  referencePoint: ""
};

export const useCreateClientHook = () => {
  const [formValues, setFormValues] = useState(INITIAL_STATE);
  const [images, setImages] = useState<string[]>([]);
  const showNotification = useNotificationStore(
    state => state.showNotification
  );

  const [loadingImages, setLoadingImages] = useState(false);

  const handleAddImages = async ({
    target: { files }
  }: ChangeEvent<HTMLInputElement>) => {
    setLoadingImages(true);

    const urls = await uploadImages(files, showNotification);

    if (urls.length === 0) return;

    setLoadingImages(false);

    setImages([...images, ...urls]);
  };

  const handleDeleteImages = async (url: string) => {
    const key = url.split(".com/")[1];

    try {
      const response = await fetch(`/api/deleteImage?key=${key}`, {
        method: "DELETE"
      });
      await response.json();

      const newImages = images.filter(image => image !== url);

      setImages(newImages);
    } catch (error) {
      showNotification({
        type: "error",
        text: GENERAL_LABELS.IMAGES.ERROR.DELETE_IMAGE
      });
    }
  };

  const handleChange = (name: string, value: string) => {
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  return {
    formValues,
    images,
    setFormValues,
    setImages,
    loadingImages,
    handleAddImages,
    handleDeleteImages,
    handleChange
  };
};
