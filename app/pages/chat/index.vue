<script setup lang="ts">
definePageMeta({
  layout: false
})

import { ref } from 'vue'
import ChatRoom from '~/components/chat/ChatRoom.vue'
import ChatRoomList from '~/components/chat/ChatRoomList.vue'

const selectedUserId = ref<string | null>(null)

const handleSelectUser = (uid: string) => {
  selectedUserId.value = uid
}
</script>

<template>
  <NuxtLayout name="dashboard">
    <div class="h-full min-h-0 flex border-t">
      <ChatRoomList class="w-120" @select-user="handleSelectUser" />

      <div class="w-full h-full min-h-0">
        <ChatRoom v-if="selectedUserId" :otherUid="selectedUserId" />
        <div v-else class="flex items-center justify-center h-full text-gray-400">
          Chọn một người để bắt đầu chat
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
