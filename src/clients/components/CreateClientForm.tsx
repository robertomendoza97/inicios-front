"use client";

import { IClient, CLIENTS_TABLE_LABELS, useCreateClientHook } from "../";
import { LeftSection } from "./LeftSection";
import { RigthSection } from "./RigthSection";

interface Props {
  clients: IClient[];
}

export const CreateClientForm = ({ clients }: Props) => {
  const {
    formValues,
    handleAddImages,
    handleDeleteImages,
    images,
    loadingImages,
    setFormValues,
    handleChange
  } = useCreateClientHook();

  return (
    <form className="shadow-lg rounded-sm border border-gray-200 max-w-[90%] p-6 bg-white flex gap-3 flex-col overflow-hidden items-center grow max-h-[90%]">
      <h2 className="text-3xl font-semibold">
        {CLIENTS_TABLE_LABELS.NEW_CLIENT}
      </h2>
      <div className="flex w-full gap-5">
        <LeftSection
          handleChange={handleChange}
          countryCode={formValues.countryCode}
          email={formValues.email}
          lastName={formValues.lastName}
          name={formValues.name}
          phone={formValues.phone}
          setFormValues={setFormValues}
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
        />
      </div>
    </form>
  );
};
