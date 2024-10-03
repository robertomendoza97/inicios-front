"use client";

import { useNotificationStore } from "@/src/utils";
import { Toast } from "flowbite-react";
import { useEffect } from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

export const Notifications = () => {
  const isVisible = useNotificationStore(state => state.isVisible);

  const { text, icon } = useNotificationStore(state => state.notificationInfo);
  const hideNotification = useNotificationStore(
    state => state.hideNotification
  );

  let timeoutId: NodeJS.Timeout | null = null;

  const handleDissmiss = () => {
    hideNotification();
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };

  useEffect(() => {
    if (isVisible) {
      timeoutId = setTimeout(() => {
        hideNotification();
      }, 4000);
    }
  }, [isVisible]);

  return (
    <div
      className={`absolute right-0 top-0 p-5 transition-[right] duration-500 ease-linear ${
        isVisible ? "right-0 " : "right-[-100%]"
      }`}
    >
      <Toast className="text-white bg-paletteColor3 flex gap-4">
        <div className="flex gap-2 items-center">
          <IoMdCheckmarkCircleOutline size={30} className="text-green-500" />
          {text}
        </div>
        <Toast.Toggle
          className="bg-paletteColor3 hover:bg-paletteColor3 text-white hover:text-white"
          onDismiss={handleDissmiss}
        />
      </Toast>
    </div>
  );
};
