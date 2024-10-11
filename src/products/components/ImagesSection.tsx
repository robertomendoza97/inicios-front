import { FileInput } from "flowbite-react";
import { CREATE_PRODUCT_LABELS } from "../";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import Image from "next/image";
import { useNotificationStore } from "@/src/utils";
import { CiImageOn } from "react-icons/ci";

interface Props {
  images: string[];
  setImages: Dispatch<SetStateAction<string[]>>;
}
export const ImagesSection = ({ images, setImages }: Props) => {
  const showNotification = useNotificationStore(
    state => state.showNotification
  );
  const handleImages = async ({
    target: { files }
  }: ChangeEvent<HTMLInputElement>) => {
    if (files) {
      const urls = [];
      for (const file of Array.from(files)) {
        if (!file.type.match(/image\/jpeg/)) {
          showNotification({
            type: "error",
            text: "Tipo de archivo no permitido. Solo se aceptan JPG y JPEG."
          });
          continue;
        }

        if (file.size > 5 * 1024 * 1024) {
          showNotification({
            type: "error",
            text: "El tamaño del archivo no debe exceder 5 MB."
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
            text: "Ocurrio un error al subir la imagen."
          });
        }
      }

      setImages([...images, ...urls]);
    }
  };

  const handleDelete = async (url: string) => {
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
        text: "Ocurrio un error al eliminar la imagen."
      });
    }
  };

  return (
    <div className="flex flex-col gap-5 items-stretch justify-between max-w-full overflow-x-auto h-1/2">
      <h3 className="text-lg font-semibold">{CREATE_PRODUCT_LABELS.IMAGES}</h3>
      <div className="flex flex-wrap gap-5 overflow-y-auto">
        {!Boolean(images.length) && (
          <CiImageOn size={140} className="text-gray-200 m-h" />
        )}
        {images.map(image => (
          <Image
            src={image}
            width={100}
            height={100}
            alt={image}
            key={image}
            style={{ objectFit: "cover", aspectRatio: "3/4" }}
            onClick={() => handleDelete(image)}
          />
        ))}
      </div>
      <div>
        <FileInput
          helperText="jpg, jpeg (5MB MAX)"
          multiple
          sizing="sm"
          onChange={handleImages}
          accept="image/jpeg"
        />
      </div>
    </div>
  );
};
