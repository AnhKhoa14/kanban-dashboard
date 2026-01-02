<template>
  <div>
    <v-snackbar v-model="showNotification" location="top right" color="success">
      Task saved successfully!
      <template v-slot:actions>
        <v-btn text @click="showNotification = false">Close</v-btn>
      </template>
    </v-snackbar>

    <v-dialog v-model="modelValue" max-width="600">
      <v-card class="rounded-xl">
        <v-card-title class="text-center py-5 text-uppercase font-weight-bold">Add New Task</v-card-title>
        <v-form ref="formRef" v-model="isFormValid" class="px-3">
          <v-text-field label="Task Name" v-model="taskName" :rules="[
            v => !!v?.trim() || 'Task name is required',
            v => v?.trim().length >= 3 || 'Min 3 characters'
          ]" />

          <v-text-field label="Tag" v-model="taskTags" :rules="[
            v => !!v?.trim() || 'Tag is required',
            v => v?.trim().length >= 2 || 'Min 2 characters'
          ]" />

          <v-textarea label="Description" v-model="taskDescription" :rules="[
            v => !!v?.trim() || 'Description is required',
            v => v?.trim().length >= 5 || 'Min 5 characters'
          ]" />

          <v-select label="Status" v-model="selectedStatus" :items="statusOptions"
            :rules="[v => !!v || 'Status is required']" />
        </v-form>

        <v-card-actions class="px-5 pb-4">
          <v-spacer></v-spacer>
          <v-btn text="Cancel" @click="modelValue = false"></v-btn>
          <v-btn color="primary" text="Save" :disabled="!isFormValid" @click="handleSave" />

        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';

const modelValue = defineModel<boolean>();
const props = defineProps<{
  status: string;
}>();

const statusOptions = ['In Progress', 'Reviewed', 'Completed'];
const selectedStatus = ref(props.status);
const showNotification = ref(false);
const taskName = ref('');
const taskTags = ref('');
const taskDescription = ref('');
const errors = ref({ name: '', tags: '', description: '', status: '' });
const emit = defineEmits<{
  taskSaved: [task: { name: string, tags: string, description: string, status: string }]
}>();
const isFormValid = ref(false);
const formRef = ref();

watch(() => props.status, (newStatus) => {
  selectedStatus.value = newStatus;
});

watch(modelValue, (newVal) => {
  if (!newVal) {
    taskName.value = '';
    taskTags.value = '';
    taskDescription.value = '';
    selectedStatus.value = props.status;
    clearErrors();
  }
});


const clearErrors = () => {
  errors.value = { name: '', tags: '', description: '', status: '' };
};

const handleSave = async () => {
  const isValid = await formRef.value.validate()

  if (!isValid) return

  emit('taskSaved', {
    name: taskName.value,
    tags: taskTags.value,
    description: taskDescription.value,
    status: selectedStatus.value
  })
  localStorage.setItem('kanban_tasks', JSON.stringify({
    name: taskName.value,
    tags: taskTags.value,
    description: taskDescription.value,
    status: selectedStatus.value
  }))
  taskName.value = ''
  taskTags.value = ''
  taskDescription.value = ''
  selectedStatus.value = props.status
  clearErrors()

  showNotification.value = true
  modelValue.value = false
}

</script>

<style></style>