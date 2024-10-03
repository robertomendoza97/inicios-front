import { ReactNode } from "react";
import { create } from "zustand";

interface NotificationInfo {
  text: string;
  icon: ReactNode;
}

interface State {
  isVisible: boolean;
  notificationInfo: NotificationInfo;
  showNotification: (notiInfo: NotificationInfo) => void;
  hideNotification: () => void;
}

export const useNotificationStore = create<State>()(set => ({
  isVisible: false,
  notificationInfo: {
    text: "",
    icon: undefined
  },
  hideNotification: () => set(() => ({ isVisible: false })),
  showNotification: (notiInfo: NotificationInfo) =>
    set(() => ({ isVisible: true, notificationInfo: { ...notiInfo } }))
}));
