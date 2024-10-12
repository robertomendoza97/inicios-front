"use client";

import { MdOutlinePortableWifiOff } from "react-icons/md";
import { COMPONENTS_LABELS } from "./";
import { Button } from "flowbite-react";

export const ErrorResponsePage = () => {
  const handleClick = () => {
    window.location.reload();
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex items-center justify-center flex-col gap-5">
        <MdOutlinePortableWifiOff size={200} />
        <h2 className="text-xl">{COMPONENTS_LABELS.ERROR_RESPONSE.TITLE}</h2>
        <Button onClick={handleClick}>
          {COMPONENTS_LABELS.ERROR_RESPONSE.RETRY}
        </Button>
      </div>
    </div>
  );
};
