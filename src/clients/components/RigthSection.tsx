import { CustomInput, CustomSelect } from "@/src/components";
import { CLIENT_LABELS } from "../utils/const";
import { IClient } from "../";
import { FileInput } from "flowbite-react";
import { GENERAL_LABELS } from "@/src/utils";
import { ChangeEvent } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";

interface Props {
  clients: IClient[];
  images: { url: string; type: string; name: string }[];
  loadingImages: boolean;
  showErrors: boolean;
  handleDeleteImages: (url: string) => Promise<void>;
  handleAddImages: (e: ChangeEvent<HTMLInputElement>) => Promise<void>;
  handleChange: (name: string, value: string) => void;
  guarantor: string;
  workDirection: string;
  homeDirection: string;
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
  homeDirection
}: Props) => {
  const idCardImages = images.filter(i => i.type === "idCard");
  const clientImages = images.filter(i => i.type === "client");

  return (
    <div className="grow flex flex-col gap-4 w-1/2">
      <CustomSelect
        label={CLIENT_LABELS.COLUMNS.GUARANTOR}
        name="guarantor"
        onChange={handleChange}
        options={clients.map(client => ({
          key: client.id.toString(),
          value: `${client.name} ${client.lastName} ${client.idCard}`
        }))}
        value={guarantor}
      />
      <CustomInput
        label={CLIENT_LABELS.COLUMNS.WORK_DIRECTION}
        name="workDirection"
        onChange={handleChange}
        value={workDirection}
        textArea
        rows={2}
      />
      <CustomInput
        label={CLIENT_LABELS.COLUMNS.HOME_DIRECTION}
        name="homeDirection"
        onChange={handleChange}
        value={homeDirection}
        textArea
        rows={2}
      />
      <div className="grow flex flex-col">
        <div className="font-medium text-sm">{CLIENT_LABELS.CLIENT_PHOTO}</div>
        <div className="flex flex-nowrap items-center gap-5 overflow-x-auto relative mb-2">
          {loadingImages && (
            <div className="absolute top-0 left-0 w-full h-full bg-paletteColor5 opacity-50 rounded flex justify-center items-center z-20">
              {GENERAL_LABELS.IMAGES.UPLOADING}
            </div>
          )}
          {!Boolean(clientImages.length) && (
            <div className="text-sm">{CLIENT_LABELS.NO_PHOTO}</div>
          )}
          {clientImages.map(image => (
            <div
              className="border flex-shrink-0 border-paletteColor1 rounded-full px-3 flex items-center gap-2 flex-nowrap"
              key={image.url}
            >
              <span className="whitespace-nowrap text-sm">{image.name}</span>
              <span
                className="cursor-pointer"
                onClick={() => handleDeleteImages(image.url)}
              >
                <IoCloseCircleOutline />
              </span>
            </div>
          ))}
        </div>
        <div>
          <FileInput
            value=""
            disabled={loadingImages}
            multiple
            name="client"
            sizing="sm"
            onChange={handleAddImages}
            accept="image/jpeg"
          />
        </div>
      </div>
      <div className="grow flex flex-col">
        <div className="font-medium text-sm">{CLIENT_LABELS.ID_PHOTO}</div>
        <div className="flex flex-nowrap items-center gap-5 overflow-x-auto relative mb-2">
          {loadingImages && (
            <div className="absolute top-0 left-0 w-full h-full bg-paletteColor5 opacity-50 rounded flex justify-center items-center z-20">
              {GENERAL_LABELS.IMAGES.UPLOADING}
            </div>
          )}
          {!Boolean(idCardImages.length) && (
            <div className="text-sm">{CLIENT_LABELS.NO_PHOTO}</div>
          )}
          {idCardImages.map(image => (
            <div
              className="border flex-shrink-0 border-paletteColor1 rounded-full px-3 flex items-center gap-2 flex-nowrap"
              key={image.url}
            >
              <span className="whitespace-nowrap text-sm">{image.name}</span>
              <span
                className="cursor-pointer"
                onClick={() => handleDeleteImages(image.url)}
              >
                <IoCloseCircleOutline />
              </span>
            </div>
          ))}
        </div>
        <div>
          <FileInput
            value=""
            disabled={loadingImages}
            name="idCard"
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
