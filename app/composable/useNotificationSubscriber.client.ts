import {
  onSnapshot,
  collection,
  query,
  orderBy,
  updateDoc,
  doc,
} from "firebase/firestore";
import { useFirebase } from "./useFirebase.client";
import { useAuth } from "./useAuth";
import { useNotificationStore } from "~/store/notification";
import { watch } from "vue";
import { useChatStore } from "~/store/chat";

export const useNotificationSubscriber = async () => {
  const { user } = await useAuth();
  const { db } = await useFirebase();
  const store = useNotificationStore();
  const chatStore = useChatStore();

  let unsubscribe: (() => void) | null = null;

  watch(
    () => user.value?.uid,
    (uid) => {
      unsubscribe?.();
      unsubscribe = null;

      if (!uid) return;

      const q = query(
        collection(db, "users", uid, "notifications"),
        orderBy("createdAt", "desc")
      );

      unsubscribe = onSnapshot(q, (snap) => {
        store.notifications = snap.docs
          .map((docSnap) => {
            const d = docSnap.data();
            if (
              d.type === "chat" &&
              chatStore.activeChatUserId === d.fromUserId &&
              !d.read
            ) {
              updateDoc(
                doc(db, "users", user.value.uid, "notifications", docSnap.id),
                { read: true }
              );
              d.read = true;
            }
            return {
              id: docSnap.id,
              title: d.title,
              body: d.body,
              read: d.read,
              fromUserId: d.fromUserId,
              type: d.type,
              createdAt: d.createdAt?.toDate()?.getTime() || Date.now(),
            };
          })
          .filter((n) => !n.read);
      });
    },
    { immediate: true }
  );

  return () => unsubscribe?.();
};
