import { NotificationInfo } from "../store/notification-store";
import { GENERAL_LABELS } from "./const";

export const uploadImages = async (
  files: FileList | null,
  showNotification: (notiInfo: NotificationInfo) => void
): Promise<string[]> => {
  const urls = [];
  if (files) {
    for (const file of Array.from(files)) {
      if (!file.type.match(/image\/jpeg/)) {
        showNotification({
          type: "error",
          text: GENERAL_LABELS.IMAGES.ERROR.TYPE
        });
        continue;
      }

      if (file.size > 5 * 1024 * 1024) {
        showNotification({
          type: "error",
          text: GENERAL_LABELS.IMAGES.ERROR.SIZE
        });
        continue;
      }

      try {
        const formData = new FormData();
        formData.append("file", file);
        const response = await fetch("/api/uploadImage", {
          method: "POST",
          body: formData
        });
        const { url } = await response.json();
        urls.push(url);
      } catch (error) {
        showNotification({
          type: "error",
          text: GENERAL_LABELS.IMAGES.ERROR.UPLOAD_IMAGE
        });
      }
    }
  }
  return urls;
};
