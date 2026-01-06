<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useNotificationSubscriber } from '~/composable/useNotificationSubscriber.client'

let stop: (() => void) | null = null

onMounted(async () => {
  stop = await useNotificationSubscriber()
})

onUnmounted(() => {
  stop?.()
})
</script>


<template>

  <v-app>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </v-app>
</template>
