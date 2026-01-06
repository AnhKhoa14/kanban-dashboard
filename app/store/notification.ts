import { defineStore } from "pinia";

export interface AppNotification {
  id: string;
  title: string;
  body: string;
  read: boolean;
  createdAt: number;
}

export const useNotificationStore = defineStore("notification", {
  state: () => ({
    notifications: [] as AppNotification[],
  }),

  getters: {
    unreadCount: (state) => state.notifications.filter((n) => !n.read).length,
  },

  actions: {
    add(notification: AppNotification) {
      this.notifications.unshift(notification);
    },

    markAllAsRead() {
      this.notifications.forEach((n) => (n.read = true));
    },
  },
});
