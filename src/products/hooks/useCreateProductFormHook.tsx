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
  PRODUCT_IMAGES_PREVIEW,
  CREATE_PRODUCT_LABELS
} from "..";
import {
  stringThousandToNumber,
  useNotificationStore,
  getFromLocalStorage
} from "@/src/utils/";

const INITIAL_STATE = {
  name: "",
  description: "",
  state: "",
  category: "",
  retailPrice: "",
  costPrice: "",
  quantity: "",
  subCategory: "",
  barCode: ""
};

export const useCreateProductFormHook = (
  action: CreateActionInterface | UpdateActionInterface,
  initialFormValues: CreateProductFormValues = INITIAL_STATE,
  successMessage: string,
  type: "create" | "update",
  id?: string,
  initialProperties: ProductProperty[] = [],
  initialImages: string[] = []
) => {
  const [imagesToDeleteWhenUpdate, setImagesToDeleteWhenUpdate] = useState<
    string[]
  >([]);
  const [firstTime, setFirstTime] = useState(true);
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
            text: CREATE_PRODUCT_LABELS.ERROR.DELETE_IMAGE
          });
        }
      }
    }

    setShowErrors(false);
    if (type === "create") {
      localStorage.removeItem(CREATE_PRODUCT_PREVIEW);
      localStorage.removeItem(PRODUCT_PROPERTIES_PREVIEW);
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
      localStorage.removeItem(CREATE_PRODUCT_PREVIEW);
      localStorage.removeItem(PRODUCT_PROPERTIES_PREVIEW);
      localStorage.removeItem(PRODUCT_IMAGES_PREVIEW);
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
            text: CREATE_PRODUCT_LABELS.ERROR.DELETE_IMAGE
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
          text: CREATE_PRODUCT_LABELS.ERROR.DELETE_IMAGE
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
    if (files) {
      const urls = [];
      for (const file of Array.from(files)) {
        if (!file.type.match(/image\/jpeg/)) {
          showNotification({
            type: "error",
            text: CREATE_PRODUCT_LABELS.ERROR.TYPE
          });
          continue;
        }

        if (file.size > 5 * 1024 * 1024) {
          showNotification({
            type: "error",
            text: CREATE_PRODUCT_LABELS.ERROR.SIZE
          });
          continue;
        }

        try {
          const formData = new FormData();
          formData.append("file", file);
          const response = await fetch("/api/uploadImage", {
            method: "POST",
            body: formData
          });
          const { url } = await response.json();
          urls.push(url);
        } catch (error) {
          showNotification({
            type: "error",
            text: CREATE_PRODUCT_LABELS.ERROR.UPLOAD_IMAGE
          });
        }
      }
      setLoadingImages(false);
      setImages([...images, ...urls]);
    }
  };

  useEffect(() => {
    if (!firstTime) {
      if (
        JSON.stringify(formValues) !== JSON.stringify(INITIAL_STATE) &&
        type === "create"
      )
        localStorage.setItem(
          CREATE_PRODUCT_PREVIEW,
          JSON.stringify(formValues)
        );

      if (type === "create")
        localStorage.setItem(
          PRODUCT_PROPERTIES_PREVIEW,
          JSON.stringify(properties)
        );

      if (type === "create")
        localStorage.setItem(PRODUCT_IMAGES_PREVIEW, JSON.stringify(images));
    }
  }, [formValues, properties, type, images, firstTime]);

  useEffect(() => {
    if (type === "create") {
      const productPreview = getFromLocalStorage(
        CREATE_PRODUCT_PREVIEW,
        JSON.stringify(INITIAL_STATE)
      );
      const propertiesPreview = getFromLocalStorage(
        PRODUCT_PROPERTIES_PREVIEW,
        "[]"
      );

      const imagesPreview = getFromLocalStorage(PRODUCT_IMAGES_PREVIEW, "[]");

      setFormValues(productPreview);
      setProperties(propertiesPreview);
      setImages(imagesPreview);

      setFirstTime(false);
    }
  }, [type]);

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
