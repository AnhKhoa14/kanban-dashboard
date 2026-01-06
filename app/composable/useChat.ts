import { ref } from "vue";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
  type Unsubscribe,
  updateDoc,
  doc,
} from "firebase/firestore";
import { useFirebase } from "./useFirebase.client";
import { useAuth } from "./useAuth";
import { sendNotification } from "./useNotification";
import { useChatStore } from "~/store/chat";

const messages = ref<any[]>([]);
let currentUnsubscribe: Unsubscribe | null = null;

export const useChat = async () => {
  const { user } = await useAuth();

  const sendMessage = async (text: string, otherUid: string) => {
    if (!text.trim() || !user.value) return;

    const { db } = await useFirebase();
    const roomId = [user.value.uid, otherUid].sort().join("_");
    const chatStore = useChatStore();

    await addDoc(collection(db, "messages", roomId, "messages"), {
      text,
      senderId: user.value.uid,
      receiverId: otherUid,
      read: false,
      createdAt: serverTimestamp(),
    });

    // if (chatStore.activeChatUserId !== otherUid) {
    //   await sendNotification({
    //     toUserId: otherUid,
    //     title: user.value.displayName || "User",
    //     body: text,
    //     type: "chat",
    //     fromUserId: user.value.uid,
    //   });
    // }
    await sendNotification({
        toUserId: otherUid,
        title: user.value.displayName || "User",
        body: text,
        type: "chat",
        fromUserId: user.value.uid,
      });
  };

  const subscribeMessages = async (otherUid: string) => {
    if (!user.value) return;

    const { db } = await useFirebase();
    const roomId = [user.value.uid, otherUid].sort().join("_");
    const chatStore = useChatStore();

    messages.value = [];
    currentUnsubscribe?.();

    const q = query(
      collection(db, "messages", roomId, "messages"),
      orderBy("createdAt", "asc")
    );

    currentUnsubscribe = onSnapshot(q, (snap) => {
      const newMessages = snap.docs.map((d) => ({ id: d.id, ...d.data() }));

      messages.value = newMessages;

      if (chatStore.activeChatUserId === otherUid) {
        snap.docs.forEach(async (d) => {
          const msgData = d.data();
          if (
            msgData.receiverId === user.value?.uid &&
            msgData.read === false
          ) {
            await updateDoc(doc(db, "messages", roomId, "messages", d.id), {
              read: true,
            });
          }
        });
      }
    });

    return currentUnsubscribe;
  };

  return { messages, sendMessage, subscribeMessages };
};
