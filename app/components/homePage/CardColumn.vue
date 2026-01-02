<script setup lang="ts">
import { CircleCheck, MessageCircleMore, Plus } from 'lucide-vue-next'
import avatar1 from './../../assets/image/avatar-1.png'
import { VueDraggableNext as draggable } from 'vue-draggable-next'

const props = defineProps<{
  title: string
  color: string
  status: string
  tasks: any[]
}>()

const emit = defineEmits(['add', 'change-status', 'column-drop'])

const tagColor = (tag: string) => {
  switch (tag) {
    case 'High Priority':
      return 'bg-[#FFF1F2] text-[#F43F5E]'
    case 'Important':
      return 'bg-[#EEF2FF] text-[#4F46E5]'
    case 'Low Priority':
      return 'bg-[#F0FDF4] text-[#22C55E]'
    case 'Meh':
      return 'bg-[#EEF2FF] text-[#4F46E5]'
    case 'Not that important':
      return 'bg-[#FFF1F2] text-[#F43F5E]'
    case 'OK':
    case 'I dont know':
      return 'bg-[#FFFBEB] text-[#F59E0B]'
    default:
      return 'bg-[#CBD5E1] text-[#475569]'
  }
}

const handleDragStart = () => {
  document.body.classList.add('dragging')
}
const handleDragEnd = () => {
  document.body.classList.remove('dragging')
}
const handleChange = (evt: any) => {
  if (evt.added) {
    const task = evt.added.element
    emit('column-drop', {
      taskId: task.id,
      toStatus: props.status
    })
  }
}


</script>

<template>
  <div class="flex flex-col gap-4 w-[320px] h-full py-8">
    <div class="flex justify-between text-white py-2 px-3 rounded-full h-12 sticky top-0 z-10"
      :style="{ backgroundColor: color }">
      <div class="flex items-center gap-3">
        <span
          class="bg-white py-1.5 px-3 rounded-full text-lg flex items-center justify-center w-10 h-8 text-black font-semibold">
          {{ tasks.length || 0 }}
        </span>
        <span class="font-bold">{{ title }}</span>
      </div>

      <button @click="$emit('add')">
        <Plus class="w-6" />
      </button>
    </div>

    <draggable :list="tasks" group="tasks" item-key="id" handle=".drag-handle" ghost-class="drag-ghost"
      chosen-class="drag-chosen" drag-class="drag-drag" :force-fallback="true" :fallback-on-body="true"
      fallback-class="drag-fallback" animation="200" class="flex flex-col gap-4 flex-1 min-h-0" @start="handleDragStart"
      @end="handleDragEnd" @change="handleChange">

      <v-card v-for="task in tasks" :key="task.id || task.name" rounded="xl"
        class="border border-[#E2E8F0] kanban-card cursor-pointer">
        <div class="drag-handle px-4 pt-4">
          <v-card-subtitle :class="[
            'rounded-full w-fit h-6 text-[11px] font-bold px-3 flex items-center justify-center border-none',
            tagColor(task.tags)
          ]">
            {{ task.tags }}
          </v-card-subtitle>

          <v-card-title class="font-bold px-0">
            {{ task.name }}
          </v-card-title>
        </div>

        <div class="drag-handle">
          <v-card-text>
            {{ task.description }}
          </v-card-text>
        </div>


        <div class="flex justify-between items-center px-4 pb-4 drag-handle">
          <div class="flex flex-row-reverse justify-end italic">
            <v-avatar size="32" class="ml-n3">
              <img :src="avatar1" alt="" />
            </v-avatar>

            <v-avatar v-if="task?.avatars?.length > 4" size="32" color="#EEF2FF"
              class="ml-n3 text-[10px] font-bold text-[#4F46E5]">
              +{{ task.avatars.length - 4 }}
            </v-avatar>
          </div>

          <div class="flex gap-4 text-sm text-[#94A3B8] font-medium">
            <span class="flex items-center gap-1.5">
              <MessageCircleMore :size="18" />
              {{ task.comments || 10 }}
            </span>
            <span class="flex items-center gap-1.5">
              <CircleCheck :size="18" />
              {{ task.likes || 5 }}
            </span>
          </div>
        </div>
      </v-card>
      <div class="drop-zone"></div>
    </draggable>
  </div>
</template>

<style scoped>
.v-avatar {
  border: 2px solid white !important;
}

.v-avatar:nth-last-child(1) {
  margin-left: 0 !important;
}

.kanban-card {
  backface-visibility: hidden;
  transform: translateZ(0);
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  touch-action: none;
}

.kanban-card * {
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
}

.drag-handle {
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
}

.drag-chosen {
  opacity: 1 !important;
}

.drag-ghost {
  opacity: 0 !important;
}

.drag-drag,
.drag-fallback {
  opacity: 1 !important;
  background: white;
  transform: rotate(2deg) scale(1.02);
  box-shadow:
    0 12px 24px rgba(0, 0, 0, 0.18),
    0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 16px;
  z-index: 9999 !important;
  pointer-events: none;
  will-change: transform;
  backface-visibility: hidden;
  -webkit-font-smoothing: antialiased;
}

.dragging * {
  user-select: none !important;
  -webkit-user-select: none !important;
  -moz-user-select: none !important;
}

.drop-zone {
  height: 100px;
  border: 2px dashed #cbd5e1;
  border-radius: 12px;
  opacity: 0;
  transition: all 0.2s ease-out;
  background: transparent;
}

</style>
