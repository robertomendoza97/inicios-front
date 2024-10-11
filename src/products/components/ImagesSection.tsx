import { FileInput } from "flowbite-react";
import { CREATE_PRODUCT_LABELS, ProductImage } from "../";

import { CiImageOn } from "react-icons/ci";
import { ChangeEvent } from "react";

interface Props {
  images: string[];
  handleAddImages: (e: ChangeEvent<HTMLInputElement>) => Promise<void>;
  handleDeleteImages: (url: string) => Promise<void>;
  loadingImages: boolean;
}
export const ImagesSection = ({
  images,
  handleDeleteImages,
  handleAddImages,
  loadingImages
}: Props) => {
  return (
    <div className="flex flex-col gap-5 items-stretch justify-between max-w-full overflow-x-auto h-1/2">
      <h3 className="text-lg font-semibold">
        {CREATE_PRODUCT_LABELS.IMAGES.TITLE}{" "}
        <span className="font-normal text-xs">
          {" "}
          {CREATE_PRODUCT_LABELS.IMAGES.ACCEPT}
        </span>
      </h3>
      <div className="flex flex-wrap gap-5 overflow-y-auto relative justify-evenly">
        {loadingImages && (
          <div className="absolute top-0 left-0 w-full h-full bg-paletteColor5 opacity-50 rounded flex justify-center items-center z-20">
            {CREATE_PRODUCT_LABELS.IMAGES.UPLOADING}
          </div>
        )}
        {!Boolean(images.length) && (
          <CiImageOn size={120} className="text-gray-200 mx-auto" />
        )}
        {images.map(image => (
          <ProductImage
            image={image}
            handleDeleteImages={handleDeleteImages}
            key={image}
          />
        ))}
      </div>
      <div>
        <FileInput
          multiple
          sizing="sm"
          onChange={handleAddImages}
          accept="image/jpeg"
        />
      </div>
    </div>
  );
};
