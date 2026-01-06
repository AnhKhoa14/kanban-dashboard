<template>
  <div
    class="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-100"
    :class="{ 'bg-gray-200': active }"
  >
    <img
      :src="room.avatar"
      class="w-12 h-12 rounded-full object-cover"
    />

    <div class="flex-1 min-w-0">
      <h3 class="font-medium truncate">{{ room.name }}</h3>
      <p class="text-sm text-gray-500 truncate">
        {{ room.lastMessage }}
      </p>
    </div>

    <div class="text-right">
      <p class="text-xs text-gray-400">{{ room.time }}</p>

      <span
        v-if="room.unread > 0"
        class="mt-1 inline-flex items-center justify-center text-xs text-white bg-blue-500 rounded-full w-5 h-5"
      >
        {{ room.unread }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  room: {
    id: string
    name: string
    lastMessage: string
    time: string
    avatar: string
    unread: number
  }
  active?: boolean
}>()
</script>
