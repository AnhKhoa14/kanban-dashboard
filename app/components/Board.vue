<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import Dialog from './Dialog.vue'
import CardColumn from './CardColumn.vue'

type Task = {
  id: string
  name: string
  tags: string
  description: string
  status: string
}

const STORAGE_KEY = 'kanban_tasks'

const isDialogOpen = ref(false)
const currentStatus = ref('')
const tasks = ref<Task[]>([])

onMounted(() => {
  if (typeof window === 'undefined') return
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      const parsed = JSON.parse(saved)
      if (Array.isArray(parsed)) {
        tasks.value = parsed
      }
    }
  } catch (error) {
    console.error('Failed to load tasks from storage', error)
  }
})

watch(tasks, (val) => {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(val))
  } catch (error) {
    console.error('Failed to save tasks to storage', error)
  }
}, { deep: true })

const handleClick = (status: string) => {
  currentStatus.value = status
  isDialogOpen.value = true
}

const handleTaskSaved = (task: Omit<Task, 'id'>) => {
  tasks.value.push({
    id: crypto.randomUUID(),
    ...task
  })

  localStorage.setItem('kanban_tasks', JSON.stringify(tasks.value))
}


const inProgressTasks = ref<Task[]>([])
const reviewedTasks = ref<Task[]>([])
const completedTasks = ref<Task[]>([])

const syncColumns = () => {
  inProgressTasks.value = tasks.value.filter(t => t.status === 'In Progress')
  reviewedTasks.value = tasks.value.filter(t => t.status === 'Reviewed')
  completedTasks.value = tasks.value.filter(t => t.status === 'Completed')
}

watch(tasks, syncColumns, { deep: true, immediate: true })

const onColumnDrop = ( taskId: string , toStatus: string ) => {
  const task = tasks.value.find(t => t.id === taskId)
  if (task) {
    task.status = toStatus
  }
}

const onChangeStatus = (payload: { taskId: string; newStatus: string }) => {
  const task = tasks.value.find(t => t.id === payload.taskId);
  if (task) task.status = payload.newStatus;
}
</script>

<template>
  <div class="flex gap-6 px-8 pb-8 justify-around">

    <CardColumn title="In Progress" color="#4F46E5" status="In Progress" :tasks="inProgressTasks"
      @add="handleClick('In Progress')" @change-status="onChangeStatus" @column-drop="onColumnDrop" />

    <CardColumn title="Reviewed" color="#F59E0B" status="Reviewed" :tasks="reviewedTasks" @add="handleClick('Reviewed')"
      @column-drop="onColumnDrop" @change-status="onChangeStatus" />

    <CardColumn title="Completed" color="#22C55E" status="Completed" :tasks="completedTasks"
      @add="handleClick('Completed')" @column-drop="onColumnDrop" @change-status="onChangeStatus" />

    <Dialog v-model="isDialogOpen" :status="currentStatus" @taskSaved="handleTaskSaved" />
  </div>
</template>
