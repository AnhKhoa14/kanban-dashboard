<template>
  <v-menu v-model="open" location="bottom end" offset="8" transition="scale-transition">
    <template #activator="{ props }">
      <div v-bind="props" class="relative inline-flex items-center justify-center cursor-pointer">
        <Bell class="w-6 text-gray-600" />
        <span v-if="store.unreadCount > 0" class="absolute -top-2 -right-1 min-w-4.5 h-4.5
                  bg-red-500 text-white text-[10px] font-bold
                  rounded-full flex items-center justify-center px-1 border-2 border-white">
          {{ store.unreadCount }}
        </span>
      </div>
    </template>

    <div class="w-80 bg-white rounded-lg shadow-xl border overflow-hidden">
      <div class="px-4 py-3 font-bold border-b text-gray-800 flex justify-between items-center">
        Notifications
      </div>

      <div class="max-h-80 overflow-y-auto">
        <div v-for="item in store.notifications" :key="item.id"
          class="relative px-4 py-3 flex items-center gap-3 transition-colors cursor-pointer group border-b"
          @click="handleNotificationClick(item)"
          :class="[!item.read ? 'bg-blue-50 hover:bg-blue-100' : 'bg-white hover:bg-gray-50']">
          <div v-if="!item.read" class="mt-1.5">
            <div class="w-2 h-2 bg-blue-600 rounded-full"></div>
          </div>

          <div v-else class="w-1 h-1 mt-1.5"></div>

          <div class="flex-1 pr-6">
            <div class="font-semibold text-sm" :class="[!item.read ? 'text-gray-900' : 'text-gray-600']">
              {{ item.title }}
            </div>
            <div class="text-xs mt-0.5" :class="[!item.read ? 'text-gray-700' : 'text-gray-400']">
              {{ item.body }}
            </div>
          </div>

          <button
            class="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-200 group-hover:opacity-100 transition-opacity">
            <EllipsisVertical class="w-4 h-4" />
          </button>
        </div>

        <div v-if="store.notifications.length === 0" class="px-4 py-10 text-center text-gray-400 text-sm">
          No new notifications
        </div>
      </div>

      <div class="border-t px-4 py-2 bg-gray-50 text-center">
        <button class="text-sm font-medium text-indigo-600 hover:text-indigo-800" @click="handleMarkAllAsRead">
          Mark all as read
        </button>
      </div>
    </div>
  </v-menu>
</template>


<script lang="ts" setup>
import { ref } from 'vue'
import { Bell, EllipsisVertical } from "lucide-vue-next";
import { useNotificationStore } from "~/store/notification";
import { useAuth } from '~/composable/useAuth';

const store = useNotificationStore();
const open = ref(false);
const { user } = await useAuth();

const handleNotificationClick = async (notification: any) => {
  if(!user.value) return;
  await store.markAsRead(notification.id, user.value.uid);
  store.notifications.find(n => n.id === notification.id)!.read = true;
}

const handleMarkAllAsRead = async () => {
  if(!user.value) return;
  await store.markAllAsRead(user.value.uid);

  store.notifications.forEach(n => (n.read = true));
}
</script>
<style></style>