"use client";

import {
  GENERAL_LABELS,
  uploadImages,
  useNotificationStore
} from "@/src/utils";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { validateCreateClientData } from "../utils/validateCreateClientData";

import { setCookie, deleteCookie } from "cookies-next";
import {
  CLIENT_LABELS,
  COOKIE_CLIENT_IMAGES,
  COOKIE_UPDATE_CLIENT_DELETE_IMAGES,
  COOKIE_UPDATE_CLIENT_IMAGES
} from "../utils/const";
import {
  IClientToCreate,
  ImagesToCreate
} from "../interfaces/client-to-create.interface";
import {
  ICreateClientAction,
  IUpdateClientAction
} from "../interfaces/actions.interface";
import { useRouter } from "next/navigation";

const INITIAL_STATE: IClientToCreate = {
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
  client?: IClientToCreate;
  action: ICreateClientAction | IUpdateClientAction;
  type: "create" | "update";
  id?: string;
  initialImagesToDelete?: string[];
}

export const useCreateClientHook = ({
  initialImages = [],
  client = INITIAL_STATE,
  action,
  type,
  id,
  initialImagesToDelete = []
}: Props) => {
  const [formValues, setFormValues] = useState(client);
  const [images, setImages] = useState<ImagesToCreate[]>(initialImages);
  const [imagesToDeleteWhenUpdate, setImagesToDeleteWhenUpdate] = useState<
    string[]
  >(initialImagesToDelete);
  const showNotification = useNotificationStore(
    state => state.showNotification
  );
  const [loading, setLoading] = useState(false);
  const [showErrors, setShowErrors] = useState(false);

  const [loadingImages, setLoadingImages] = useState(false);

  const router = useRouter();
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
    if (type === "create") {
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
    } else {
      setImagesToDeleteWhenUpdate([...imagesToDeleteWhenUpdate, url]);
      setImages(images.filter(img => img.url !== url));
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

    if (type === "create") {
      const { data, error, success, message } = await (
        action as ICreateClientAction
      )({
        ...formValues,
        images
      });

      if (error) {
        showNotification({
          text: `${GENERAL_LABELS.ERRORS.NOTIFICATION_ERROR}: ${message}`,
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
    } else if (type === "update") {
      const { data, error, success, message } = await (
        action as IUpdateClientAction
      )(id!, {
        ...formValues,
        images
      });

      for (const imageToDelete of imagesToDeleteWhenUpdate) {
        const key = imageToDelete.split(".com/")[1];

        try {
          await fetch(`/api/deleteImage?key=${key}`, {
            method: "DELETE"
          });
        } catch (error) {
          showNotification({
            type: "error",
            text: GENERAL_LABELS.IMAGES.ERROR.DELETE_IMAGE
          });
        }
      }

      if (error) {
        showNotification({
          text: `${GENERAL_LABELS.ERRORS.NOTIFICATION_ERROR}: ${message}`,
          type: "error"
        });
      } else if (success && data) {
        deleteCookie(COOKIE_UPDATE_CLIENT_IMAGES);
        deleteCookie(COOKIE_UPDATE_CLIENT_DELETE_IMAGES);
        showNotification({
          text: CLIENT_LABELS.NOTIFICATIONS.CLIENT_UPDATED,
          type: "success"
        });
      }
    }

    setLoading(false);
    setShowErrors(false);
    router.refresh();
  };

  useEffect(() => {
    if (type === "update") {
      setCookie(`${COOKIE_UPDATE_CLIENT_IMAGES}-${id}`, JSON.stringify(images));
    }
  }, [images, id, type]);

  useEffect(() => {
    if (type === "update") {
      setCookie(
        `${COOKIE_UPDATE_CLIENT_DELETE_IMAGES}-${id}`,
        JSON.stringify(imagesToDeleteWhenUpdate)
      );
    }
  }, [imagesToDeleteWhenUpdate, id, type]);

  useEffect(() => {
    if (type === "create") {
      setCookie(COOKIE_CLIENT_IMAGES, JSON.stringify(images));
    }
  }, [images, type]);

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
