<script setup lang="ts">
import { ref, watch, nextTick, onMounted, onBeforeUnmount } from 'vue'
import ChatInput from './ChatInput.vue'
import ChatMessage from './ChatMessage.vue'
import { useChat } from '~/composable/useChat'
import { useAuth } from '~/composable/useAuth'
import { doc, getDoc } from 'firebase/firestore'
import { useFirebase } from '~/composable/useFirebase.client'

const props = defineProps<{ otherUid: string }>()

const { db } = await useFirebase()
const { messages, subscribeMessages, sendMessage } = await useChat()
const { user } = await useAuth()

const otherUser = ref<{ displayName: string; photoURL?: string } | null>(null)
const messagesContainer = ref<HTMLDivElement | null>(null)
const stopMessages = ref<(() => void) | null>(null)

const loadChat = async (uid: string) => {
  const userDoc = await getDoc(doc(db, 'users', uid))
  if (userDoc.exists()) {
    otherUser.value = userDoc.data() as { displayName: string; photoURL?: string }
  } else {
    otherUser.value = null
    console.warn('User not found')
  }

  stopMessages.value?.()
  stopMessages.value = await subscribeMessages(uid)

  nextTick(() => {
    if (messagesContainer.value)
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  })
}

onMounted(() => loadChat(props.otherUid))

onBeforeUnmount(() => {
  stopMessages.value?.()
})

watch(() => props.otherUid, (newUid) => {
  if (newUid) loadChat(newUid)
})

watch(messages, async () => {
  await nextTick()
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
})
</script>


<template>
  <div class="flex flex-col h-full min-h-0 border rounded-md overflow-hidden">
    <div class="flex items-center justify-between h-14 border-b px-4 bg-white">
      <div class="flex items-center">
        <img :src="otherUser?.photoURL" alt="" class="w-10 h-10 rounded-full" />
        <div class="ml-3">
          <div class="font-semibold">{{ otherUser?.displayName || 'Unknown' }}</div>
          <div class="text-sm text-gray-500">Online</div>
        </div>
      </div>
      <div class="flex items-center">
        <v-icon name="phone" class="mx-2" />
        <v-icon name="video" class="mx-2" />
        <v-icon name="info-circle" class="mx-2" />
      </div>
    </div>

    <div ref="messagesContainer" class="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-50 flex flex-col">
      <transition-group name="chat" tag="div">
        <ChatMessage v-for="msg in messages" :key="msg.id" :message="msg" :isMine="msg.senderId === user?.uid" />
      </transition-group>
    </div>


    <div class="border-t px-4 py-2 bg-white">
      <ChatInput :otherUserId="props.otherUid"
        @sendMessage="(msgContent: string) => sendMessage(props.otherUid, msgContent)" />
    </div>
  </div>
</template>

<style scoped>
div::-webkit-scrollbar {
  width: 6px;
}

div::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 3px;
}

.chat-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.chat-enter-active {
  transition: all 0.3s ease;
}

.chat-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.chat-leave-from {
  opacity: 1;
}

.chat-leave-active {
  opacity: 0;
  transition: opacity 0.2s;
}

.chat-leave-to {
  opacity: 0;
}
</style>
