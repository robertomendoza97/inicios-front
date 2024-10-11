"use client";

import { useNotificationStore } from "@/src/utils";
import { Toast } from "flowbite-react";
import { useEffect, useRef } from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdErrorOutline } from "react-icons/md";
import { MdInfoOutline } from "react-icons/md";
import { IoWarningOutline } from "react-icons/io5";

const notificationStyles = {
  info: {
    icon: <MdInfoOutline size={30} className="border-cyan-600" />,
    styles: "border-cyan-600"
  },
  success: {
    icon: <IoMdCheckmarkCircleOutline className="text-green-500" size={30} />,
    styles: ""
  },
  error: {
    icon: <MdErrorOutline size={30} className="text-red-600" />,
    styles: "border-red-600"
  },
  warning: {
    icon: <IoWarningOutline size={30} className="border-yellow-600" />,
    styles: "border-yellow-600"
  }
};

export const Notifications = () => {
  const isVisible = useNotificationStore(state => state.isVisible);

  const { text, type } = useNotificationStore(state => state.notificationInfo);
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
      <Toast
        className={`flex gap-4 border  ${notificationStyles[type].styles}`}
      >
        <div className="flex gap-2 items-center">
          {notificationStyles[type].icon}
          {text}
        </div>
        <Toast.Toggle onDismiss={handleDissmiss} />
      </Toast>
    </div>
  );
};
