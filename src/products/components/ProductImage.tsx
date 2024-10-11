"use client";

import { Spinner } from "flowbite-react";
import Image from "next/image";
import React, { useState } from "react";
import { BsTrash } from "react-icons/bs";

interface Props {
  image: string;
  handleDeleteImages: (url: string) => Promise<void>;
}
export const ProductImage = ({ image, handleDeleteImages }: Props) => {
  const [loaded, setLoaded] = useState(false);

  const handleDelete = () => {
    setLoaded(false);
    handleDeleteImages(image);
  };
  return (
    <div className="border relative aspect-[3/4] w-24 rounded bg-slate-600">
      <Image
        src={image}
        fill
        alt={image}
        key={image}
        className="rounded object-cover"
        onLoad={() => setLoaded(true)}
      />
      {!loaded && (
        <div className="absolute top-0 left-0 h-full w-full flex items-center justify-center">
          <Spinner />
        </div>
      )}
      <BsTrash
        size={20}
        className="absolute rounded-full top-1 right-1 cursor-pointer bg-white p-1 text-red-600"
        onClick={handleDelete}
      />
    </div>
  );
};
