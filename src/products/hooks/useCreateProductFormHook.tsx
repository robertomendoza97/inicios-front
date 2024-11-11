"use client";

import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import {
  CreateProductFormValues,
  ProductProperty,
  validateData,
  ProductToCreate,
  CREATE_PRODUCT_PREVIEW,
  PRODUCT_PROPERTIES_PREVIEW,
  CreateActionInterface,
  UpdateActionInterface,
  PRODUCT_IMAGES_PREVIEW
} from "..";
import {
  GENERAL_LABELS,
  stringThousandToNumber,
  useNotificationStore,
  uploadImages
} from "@/src/utils/";
import { deleteCookie, setCookie } from "cookies-next";

export const useCreateProductFormHook = (
  action: CreateActionInterface | UpdateActionInterface,
  initialFormValues: CreateProductFormValues,
  successMessage: string,
  type: "create" | "update",
  id?: string,
  initialProperties: ProductProperty[] = [],
  initialImages: string[] = []
) => {
  const [imagesToDeleteWhenUpdate, setImagesToDeleteWhenUpdate] = useState<
    string[]
  >([]);

  const [loadingImages, setLoadingImages] = useState(false);
  const [images, setImages] = useState<string[]>(initialImages);
  const [formValues, setFormValues] =
    useState<CreateProductFormValues>(initialFormValues);
  const [properties, setProperties] =
    useState<ProductProperty[]>(initialProperties);
  const [loading, setLoading] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const showNotification = useNotificationStore(
    state => state.showNotification
  );

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateData(formValues)) {
      setShowErrors(true);
      return;
    }

    if (loading) return;

    setLoading(true);

    const objToSend: ProductToCreate = {
      costPrice: stringThousandToNumber(formValues.costPrice),
      retailPrice: stringThousandToNumber(formValues.retailPrice),
      properties,
      quantity: Number(formValues.quantity),
      fkSubcategory: Number(formValues.subCategory),
      tags: [],
      images,
      name: formValues.name,
      description: formValues.description,
      state: formValues.state
    };

    if (type === "create") {
      await (action as CreateActionInterface)(objToSend);
    } else if (type === "update" && id) {
      await (action as UpdateActionInterface)(id, objToSend);

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
    }

    setShowErrors(false);
    if (type === "create") {
      deleteCookie(CREATE_PRODUCT_PREVIEW);
      deleteCookie(PRODUCT_PROPERTIES_PREVIEW);
      setFormValues({
        name: "",
        barCode: "",
        category: "",
        costPrice: "",
        description: "",
        quantity: "",
        retailPrice: "",
        state: "",
        subCategory: ""
      });
      setProperties([]);
      setImages([]);
    }

    showNotification({
      text: successMessage,
      type: "success"
    });
    setLoading(false);
  };

  const handleReset = () => {
    setFormValues(initialFormValues);
    setProperties(initialProperties);
    setShowErrors(false);
    setImages(initialImages);

    if (type === "create") {
      deleteCookie(CREATE_PRODUCT_PREVIEW);
      deleteCookie(PRODUCT_PROPERTIES_PREVIEW);
      deleteCookie(PRODUCT_IMAGES_PREVIEW);
    }

    if (images.length > 0) {
      for (const image of images.filter(
        img => !initialImages.some(initialImage => initialImage === img)
      )) {
        const key = image.split(".com/")[1];

        try {
          fetch(`/api/deleteImage?key=${key}`, {
            method: "DELETE"
          });
        } catch (error) {
          showNotification({
            type: "error",
            text: GENERAL_LABELS.IMAGES.ERROR.DELETE_IMAGE
          });
        }
      }
    }
  };

  const handleDeleteImages = async (url: string) => {
    if (type === "create") {
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
    } else if (type === "update") {
      setImagesToDeleteWhenUpdate([...imagesToDeleteWhenUpdate, url]);
      setImages(images.filter(img => img !== url));
    }
  };

  const handleAddImages = async ({
    target: { files }
  }: ChangeEvent<HTMLInputElement>) => {
    setLoadingImages(true);

    const urls = await uploadImages(files, showNotification);

    if (urls.length === 0) return;

    setLoadingImages(false);

    setImages([...images, ...urls]);
  };

  useEffect(() => {
    if (type === "create") {
      setCookie(CREATE_PRODUCT_PREVIEW, JSON.stringify(formValues));
      setCookie(PRODUCT_PROPERTIES_PREVIEW, JSON.stringify(properties));
      setCookie(PRODUCT_IMAGES_PREVIEW, JSON.stringify(images));
    }
  }, [formValues, properties, type, images]);

  return {
    formValues,
    setFormValues,
    properties,
    setProperties,
    loading,
    showErrors,
    onSubmit,
    handleReset,
    images,
    handleDeleteImages,
    handleAddImages,
    loadingImages
  };
};
