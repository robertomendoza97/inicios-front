import React from "react";
import { GENERAL_LABELS } from "../utils";
import { Spinner } from "flowbite-react";

export const Loading = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-5">
        <h1 className="text-2xl font-semibold uppercase">
          {GENERAL_LABELS.LOADING}
        </h1>
        <Spinner className="w-20 h-20" />
      </div>
    </div>
  );
};
