<template>
  <div class="pt-16">
    <!-- <client-only> -->
      <v-sheet elevation="0">
        <v-tabs color="#4F46E5" class="pl-4 pr-8">
          <v-tab value="status" class="text-[#cbd5e1]"
            style="text-transform: none !important; letter-spacing: normal;">By
            Status</v-tab>
          <v-tab value="total" class="text-[#cbd5e1]"
            style="text-transform: none !important; letter-spacing: normal;">By
            Total Tasks
            <span
              class="rounded-full text-[#4F46E5] bg-[#EEF2FF] border border-[#A5B4FC] ml-2 px-2 py-1 gap-1">12</span>
          </v-tab>
          <v-tab value="due" class="text-[#cbd5e1]"
            style="text-transform: none !important; letter-spacing: normal;">Tasks
            Due</v-tab>
          <v-tab value="extra" class="text-[#cbd5e1]"
            style="text-transform: none !important; letter-spacing: normal;">Extra Tasks</v-tab>
          <v-tab value="completed" class="text-[#cbd5e1]"
            style="text-transform: none !important; letter-spacing: normal;">Tasks Completed</v-tab>
          <div class="ml-auto flex items-center gap-4 text-sm ">
            <span>
              Sort by
            </span>
            <span class="text-[#475569] flex items-center justify-center 
          rounded-full border border-[#cbd5e1] gap-1.5 px-2 py-1">
              Newest
              <ChevronDown />
            </span>
          </div>

        </v-tabs>
        <v-divider></v-divider>
      </v-sheet>
    <!-- </client-only> -->
  </div>
</template>

<script lang="ts" setup>
import { ChevronDown } from 'lucide-vue-next';


</script>

<style></style>