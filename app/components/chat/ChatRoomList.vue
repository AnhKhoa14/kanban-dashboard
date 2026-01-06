<template>
  <div class="flex flex-col h-full min-h-0 border-r bg-white">
    <div class="pa-4 border-b">
      <h2 class="text-lg font-bold text-gray-800">Message</h2>
    </div>

    <div class="flex-1 overflow-y-auto custom-scrollbar">
      <div v-for="user in filteredUsers" :key="user.uid" @click="$emit('select-user', user.uid)"
        class="group flex items-center gap-4 px-4 py-3 cursor-pointer transition-all duration-200 hover:bg-blue-50 relative"
        :class="{ 'bg-blue-50/50': selectedUserId === user.uid }">
        <div class="relative">
          <v-avatar :image="user?.photoURL || 'https://via.placeholder.com/150'" size="48"
            class="elevation-2 border-2 border-white" />
          <span class="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
        </div>

        <div class="flex flex-col flex-1 min-w-0">
          <div class="flex justify-between items-baseline">
            <span class="font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
              {{ user.displayName }}
            </span>
            <span class="text-xs text-gray-400">12:45</span>
          </div>
          <p class="text-sm text-gray-500 truncate">Click to start a conversation...</p>
        </div>

        <div
          class="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 scale-y-0 group-hover:scale-y-100 transition-transform duration-200">
        </div>
      </div>
    </div>
  </div>
</template>



<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { collection, getDocs } from 'firebase/firestore'
import { useFirebase } from '~/composable/useFirebase.client'
import { useAuth } from '~/composable/useAuth'

const users = ref<any[]>([])
const selectedUserId = ref<string | null>(null)
const { user } = await useAuth()

const filteredUsers = computed(() => users.value.filter(u => u.uid !== user.value?.uid))

onMounted(async () => {
  const { db } = await useFirebase()
  const snapshot = await getDocs(collection(db, 'users'))
  users.value = snapshot.docs.map(doc => ({ uid: doc.id, ...doc.data() }))
  console.log('Fetched users:', users.value)
})
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e2e8f0;
  border-radius: 10px;
}

.custom-scrollbar:hover::-webkit-scrollbar-thumb {
  background: #cbd5e1;
}
</style>