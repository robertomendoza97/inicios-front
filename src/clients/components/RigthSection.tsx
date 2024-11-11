import { CustomImage, CustomInput, CustomSelect } from "@/src/components";
import { CLIENTS_TABLE_LABELS } from "../utils/const";
import { IClient } from "../";
import { FileInput } from "flowbite-react";
import { GENERAL_LABELS } from "@/src/utils";
import { CiImageOn } from "react-icons/ci";
import { ChangeEvent } from "react";

interface Props {
  clients: IClient[];
  images: string[];
  loadingImages: boolean;
  handleDeleteImages: (url: string) => Promise<void>;
  handleAddImages: (e: ChangeEvent<HTMLInputElement>) => Promise<void>;
  handleChange: (name: string, value: string) => void;
  guarantor: string;
  workDirection: string;
  referencePoint: string;
}

export const RigthSection = ({
  clients,
  images,
  loadingImages,
  handleDeleteImages,
  handleAddImages,

  handleChange,
  guarantor,
  workDirection,
  referencePoint
}: Props) => {
  return (
    <div className="grow flex flex-col gap-5  w-1/2">
      <CustomSelect
        label={CLIENTS_TABLE_LABELS.COLUMNS.GUARANTOR}
        name="guarantor"
        onChange={handleChange}
        options={clients.map(client => ({
          key: client.id.toString(),
          value: `${client.name} ${client.lastName}`
        }))}
        value={guarantor}
      />
      <CustomInput
        label={CLIENTS_TABLE_LABELS.COLUMNS.WORK_DIRECTION}
        name="workDirecion"
        onChange={handleChange}
        value={workDirection}
        textArea
      />
      <CustomInput
        label={CLIENTS_TABLE_LABELS.COLUMNS.REFERENCE_POINT}
        name="referencePoint"
        onChange={handleChange}
        value={referencePoint}
        textArea
      />

      <div>
        <div className="flex flex-wrap gap-5 overflow-y-auto relative justify-evenly">
          {loadingImages && (
            <div className="absolute top-0 left-0 w-full h-full bg-paletteColor5 opacity-50 rounded flex justify-center items-center z-20">
              {GENERAL_LABELS.IMAGES.UPLOADING}
            </div>
          )}
          {!Boolean(images.length) && (
            <CiImageOn size={120} className="text-gray-200 mx-auto" />
          )}
          {images.map(image => (
            <CustomImage
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
    </div>
  );
};
