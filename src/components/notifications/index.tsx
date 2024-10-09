"use client";

import { useNotificationStore } from "@/src/utils";
import { Toast } from "flowbite-react";
import { useEffect, useRef } from "react";

export const Notifications = () => {
  const isVisible = useNotificationStore(state => state.isVisible);

  const { text, icon } = useNotificationStore(state => state.notificationInfo);
  const hideNotification = useNotificationStore(
    state => state.hideNotification
  );

  const timeoutId = useRef<NodeJS.Timeout | null>();

  const handleDissmiss = () => {
    hideNotification();
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
      timeoutId.current = null;
    }
  };

  useEffect(() => {
    if (isVisible) {
      timeoutId.current = setTimeout(() => {
        hideNotification();
      }, 4000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

  return (
    <div
      className={`absolute right-0 top-0 p-5 transition-[right] duration-500 z-50 ease-linear ${
        isVisible ? "right-0 " : "right-[-100%]"
      }`}
    >
      <Toast className="text-white bg-paletteColor3 flex gap-4">
        <div className="flex gap-2 items-center">
          {icon}
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
