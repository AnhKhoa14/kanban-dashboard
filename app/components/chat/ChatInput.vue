<template>
  <div class="border-t bg-white p-3">
    <div class="flex flex-col gap-2 max-w-7xl mx-auto">

      <!-- Toolbar -->
      <div class="flex items-center gap-4 px-2 py-2 border-b border-gray-200">
        <v-icon
          icon="mdi-emoticon-happy-outline"
          class="text-gray-500 hover:text-indigo-600 cursor-pointer"
          size="22"
        />
        <v-icon
          icon="mdi-paperclip"
          class="text-gray-500 hover:text-indigo-600 cursor-pointer"
          size="22"
        />
        <v-icon
          icon="mdi-image-outline"
          class="text-gray-500 hover:text-indigo-600 cursor-pointer"
          size="22"
        />
      </div>

      <!-- Input -->
      <div class="relative flex items-center">
        <v-textarea
          v-model="message"
          placeholder="Type your message..."
          auto-grow
          rows="1"
          max-rows="5"
          variant="plain"
          density="comfortable"
          hide-details
          class="chat-input"
          @keydown.enter.exact.prevent="handleSend"
          @keydown.enter.shift.exact="newLine"
        >
          <template #append-inner>
            <div class="pb-1">
              <ThumbsUp
                v-if="!message.trim()"
                class="cursor-pointer text-gray-400 hover:text-indigo-600 transition-colors"
                :size="20"
                @click="sendLike"
              />
              <SendHorizontal
                v-else
                class="cursor-pointer text-indigo-600"
                :size="20"
                @click="handleSend"
              />
            </div>
          </template>
        </v-textarea>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { SendHorizontal, ThumbsUp } from 'lucide-vue-next';
import { ref } from 'vue'
import { useChat } from '~/composable/useChat';

const { sendMessage } = await useChat()
const message = ref('')

// otherUserId là uid của người bạn chat
const props = defineProps<{ otherUserId: string }>()

const handleSend = async () => {
  if (!message.value.trim()) return
  await sendMessage(message.value, props.otherUserId)
  message.value = ''
}
const newLine = () => {
  message.value += '\n'
}
const sendLike = async () => {
  await sendMessage('👍', props.otherUserId)
}
</script>


<style scoped>
.chat-input {
  align-items: center;
}

:deep(.v-field__append-inner) {
  display: flex;
  align-items: center;
  margin-right: 8px;
}
</style>
