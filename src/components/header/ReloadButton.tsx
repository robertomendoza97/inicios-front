"use client";

import { useRouter } from "next/navigation";
import { TfiReload } from "react-icons/tfi";

export const ReloadButton = () => {
  const route = useRouter();

  return (
    <TfiReload
      className="text-white cursor-pointer"
      size={25}
      onClick={() => route.refresh()}
    />
  );
};
