"use client";

import { useUIStore } from "@/src/store/ui-store";
import { MouseEvent, useEffect, useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";

export const Modal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isVisible = useUIStore(state => state.isModalOpen);
  const modalContent = useUIStore(state => state.modalContent);
  const closeModal = useUIStore(state => state.toggleModal);

  const handleClose = (e: MouseEvent<HTMLDivElement | HTMLOrSVGElement>) => {
    e.stopPropagation();

    setIsOpen(false);
    setTimeout(() => {
      closeModal();
    }, 100);
  };

  useEffect(() => {
    if (isVisible) {
      setTimeout(() => {
        setIsOpen(true);
      }, 10);
    }
  }, [isVisible]);

  return (
    <div
      style={{ visibility: isVisible ? "visible" : "hidden" }}
      className={`h-full w-full fixed z-40 transition-all ease-linear duration-100 ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="relative w-full h-full flex justify-center items-center">
        <div
          onClick={handleClose}
          className="fixed z-0 w-full h-full top-0 left-0 backdrop-blur-sm bg-slate-600 bg-opacity-50"
        ></div>
        <div className="bg-white rounded p-5 text-slate-500 relative z-10">
          <div>{modalContent}</div>
          <IoCloseCircleOutline
            onClick={handleClose}
            className="absolute top-1 right-1 cursor-pointer text-red-500"
            size={26}
          />
        </div>
      </div>
    </div>
  );
};
