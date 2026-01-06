import { defineStore } from "pinia";
import { doc, updateDoc } from "firebase/firestore";
import { useFirebase } from "~/composable/useFirebase.client";

export interface AppNotification {
  id: string;
  title: string;
  body: string;
  read: boolean;
  createdAt: any;
  fromUserId?: string;
  type?: "chat" | "system" | "order";
}

export const useNotificationStore = defineStore("notification", {
  state: () => ({
    notifications: [] as AppNotification[],
  }),

  getters: {
    unreadCount: (state) => state.notifications.filter((n) => !n.read).length,
    unreadCountByUser: (state) => (userId: string) =>
      state.notifications.filter((n) => !n.read && n.fromUserId === userId)
        .length,
  },

  actions: {
    async markAsRead(notificationId: string, userId: string) {
      const { db } = await useFirebase();

      await updateDoc(
        doc(db, "users", userId, "notifications", notificationId),
        { read: true }
      );
    },

    async markAllAsRead(userId: string) {
      const { db } = await useFirebase();

      const unread = this.notifications.filter((n) => !n.read);

      await Promise.all(
        unread.map((n) =>
          updateDoc(doc(db, "users", userId, "notifications", n.id), {
            read: true,
          })
        )
      );
    },

    async markReadByUser(fromUserId: string, userId: string) {
      const { db } = await useFirebase();
      const unread = this.notifications.filter(n => !n.read && n.fromUserId === fromUserId);

      await Promise.all(
        unread.map((n) =>
          updateDoc(doc(db, "users", userId, "notifications", n.id), {
            read: true,
          })
        )
      );
      unread.forEach(n => n.read = true);
    }

  },
});
