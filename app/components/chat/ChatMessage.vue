<template>
  <div class="flex mt-2 px-2" :class="isMine ? 'justify-end' : 'justify-start'">
    <img v-if="!isMine" src="./../../assets/image/avatar-1.png" class="w-10 h-10 rounded-full mr-2" />

    <div class="max-w-xs px-4 py-2 rounded-2xl" :class="isMine ? 'bg-blue-500 text-white' : 'bg-white'">
      <p class="text-[16px] wrap-break-word">{{ message.text }}</p>
      <span class="block text-[12px] text-right text-gray-400">
        {{ message.timestamp }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  message: {
    text: string
    timestamp: string
  }
  isMine: boolean
}>()
</script>
