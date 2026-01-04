<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import Dialog from './Dialog.vue'
import CardColumn from './CardColumn.vue'
import { useFirebase } from '~/configs/firebase'
import { doc, updateDoc } from 'firebase/firestore'
import { getMyTasks } from '~/services/task.service'
import type { Task } from '~/services/task.service'
import { useAuth } from '~/composable/useAuth'

const isDialogOpen = ref(false)
const currentStatus = ref('')
const tasks = ref<Task[]>([])
const { user, ready } = useAuth()

watch(ready, async (isReady) => {
  if (!isReady || !user.value) return

  try {
    tasks.value = await getMyTasks()
  } catch (err) {
    console.error(err)
  }
}, { immediate: true })

const handleClick = (status: string) => {
  currentStatus.value = status
  isDialogOpen.value = true
}

const handleTaskSaved = (task: Task) => {
  tasks.value.push(task);
}


const inProgressTasks = computed(() =>
  tasks.value.filter(t => t.status === 'In Progress')
)
const reviewedTasks = computed(() =>
  tasks.value.filter(t => t.status === 'Reviewed')
)
const completedTasks = computed(() =>
  tasks.value.filter(t => t.status === 'Completed')
)

const onColumnDrop = async (payload: { taskId: string; toStatus: string }) => {
  const { auth, db } = useFirebase();
  const user = auth.currentUser;
  if(!user) return;

  const ref = doc(db, 'users', user.uid, 'tasks', payload.taskId);
  await updateDoc(ref, {
    status: payload.toStatus
  })
  const task = tasks.value.find(t => t.id === payload.taskId)
  if (!task) return

  task.status = payload.toStatus
  tasks.value = [...tasks.value]
  console.log('Updated task status:', task)
}

// const onChangeStatus = (payload: { taskId: string; newStatus: string }) => {
//   const task = tasks.value.find(t => t.id === payload.taskId);
//   if (task) {
//     task.status = payload.newStatus;
//     tasks.value = [...tasks.value]
//     try {
//       localStorage.setItem('kanban_tasks', JSON.stringify(tasks.value))
//     } catch (error) {
//       console.error('Failed to save to localStorage', error)
//     }
//   }
// }


</script>

<template>
  <div class="grid grid-cols-3 gap-6 px-8 pb-8 min-h-screen overflow-x-auto">

    <CardColumn title="In Progress" color="#4F46E5" status="In Progress" :tasks="inProgressTasks"
      @add="handleClick('In Progress')" @column-drop="onColumnDrop" />

    <CardColumn title="Reviewed" color="#F59E0B" status="Reviewed" :tasks="reviewedTasks" @add="handleClick('Reviewed')"
      @column-drop="onColumnDrop" />

    <CardColumn title="Completed" color="#22C55E" status="Completed" :tasks="completedTasks"
      @add="handleClick('Completed')" @column-drop="onColumnDrop" />

    <Dialog v-model="isDialogOpen" :status="currentStatus" @taskSaved="handleTaskSaved" />
  </div>
</template>
