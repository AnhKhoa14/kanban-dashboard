<template>
  <v-app-bar :elevation="0" class="pl-4 pr-8 ">
    <v-app-bar-title>Kanban Dashboard 🃏</v-app-bar-title>

    <div class="ml-auto flex items-center gap-2">
      <span class="rounded-full p-2 w-10 h-10 items-center flex justify-center cursor-pointer">
        <Search class="w-6" />
      </span>
      <span class="flex items-center gap-2 bg-[#4f46e5] text-white px-3 py-1 rounded-full h-10 cursor-pointer">
        Share
        <Share2 class="w-5" />
      </span>
      <span class="rounded-full border-2 border-[#cbd5e1] p-2 w-10 h-10 items-center flex justify-center cursor-pointer">
        <HardDriveUpload class="w-6" />
      </span>
      <span class="rounded-full border-2 border-[#cbd5e1] p-2 w-10 h-10 items-center flex justify-center cursor-pointer">
        <Plus class="w-6" />
      </span>
    </div>
  </v-app-bar>
</template>

<script lang="ts" setup>
import { HardDriveUpload, Plus, Search, Share2 } from 'lucide-vue-next';


</script>

<style></style>