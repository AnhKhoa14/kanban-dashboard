import { getToken, onMessage } from "firebase/messaging";
import { useFirebase } from "./useFirebase.client";
import { useNotificationStore } from "~/store/notification";

export const useFcm = async () => {
  const config = useRuntimeConfig();
  const { messaging } = await useFirebase();

  if (!messaging) return null;

  const permission = await Notification.requestPermission();
  if (permission !== "granted") return null;

  const token = await getToken(messaging, {
    vapidKey: config.public.firebaseVapidKey,
  });

  const store = useNotificationStore();

  onMessage(messaging, (payload) => {
    store.add({
      id: crypto.randomUUID(),
      title: payload.notification?.title || "New Notification",
      body: payload.notification?.body || "",
      read: false,
      createdAt: Date.now(),
    })
    console.log("FCM foreground message:", payload);
  });

  return token;
};
