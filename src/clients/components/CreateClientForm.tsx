"use client";

import { Button } from "flowbite-react";
import {
  IClient,
  CLIENT_LABELS,
  useCreateClientHook,
  validateCreateClientData,
  ImagesToCreate
} from "../";
import { LeftSection } from "./LeftSection";
import { RigthSection } from "./RigthSection";
import { GENERAL_LABELS } from "@/src/utils";

interface Props {
  clients: IClient[];
  initialImages: ImagesToCreate[];
}

export const CreateClientForm = ({ clients, initialImages }: Props) => {
  const {
    formValues,
    handleAddImages,
    handleDeleteImages,
    images,
    loadingImages,
    handleChange,
    handleSubmit,
    loading,
    showErrors
  } = useCreateClientHook({ initialImages });

  return (
    <form
      onSubmit={handleSubmit}
      className="shadow-lg rounded-sm border border-gray-200 max-w-[90%] p-6 bg-white flex gap-3 flex-col overflow-auto items-center grow max-h-[90%]"
    >
      <h2 className="text-3xl font-semibold">{CLIENT_LABELS.NEW_CLIENT}</h2>
      <div className="flex w-full gap-4 mb-4">
        <LeftSection
          handleChange={handleChange}
          countryCode={formValues.countryCode}
          email={formValues.email}
          lastName={formValues.lastName}
          name={formValues.name}
          phoneNumber={formValues.phoneNumber}
          idCard={formValues.idCard}
          profession={formValues.profession}
          showErrors={showErrors}
        />
        <RigthSection
          referencePoint={formValues.referencePoint}
          workDirection={formValues.workDirection}
          guarantor={formValues.guarantor}
          handleChange={handleChange}
          clients={clients}
          images={images}
          handleAddImages={handleAddImages}
          handleDeleteImages={handleDeleteImages}
          loadingImages={loadingImages}
          showErrors={showErrors}
        />
      </div>
      <Button
        className={`w-full ${
          loading || !validateCreateClientData(formValues) || images.length < 2
            ? "opacity-50 cursor-not-allowed"
            : ""
        }`}
        type="submit"
      >
        {GENERAL_LABELS.SEND}
      </Button>
    </form>
  );
};
