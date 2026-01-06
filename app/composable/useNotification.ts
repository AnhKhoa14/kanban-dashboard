import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useFirebase } from "./useFirebase.client";

interface SendNotificationPayload {
  toUserId: string;
  title: string;
  body: string;
  type?: "chat" | "system" | "order";
  fromUserId?: string;
}

export const sendNotification = async ({
  toUserId,
  title,
  body,
  type = "system",
  fromUserId,
}: SendNotificationPayload) => {
  const { db } = await useFirebase();

  await addDoc(collection(db, "users", toUserId, "notifications"), {
    title,
    body,
    type,
    fromUserId: fromUserId || null,
    read: false,
    createdAt: serverTimestamp(),
  });
};
