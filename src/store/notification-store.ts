import { create } from "zustand";

interface NotificationInfo {
  text: string;
  type: "info" | "success" | "warning" | "error";
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
    type: "error"
  },
  hideNotification: () => set(() => ({ isVisible: false })),
  showNotification: (notiInfo: NotificationInfo) =>
    set(() => ({ isVisible: true, notificationInfo: { ...notiInfo } }))
}));
