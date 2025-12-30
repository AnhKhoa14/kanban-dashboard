<template>
  <div class="flex gap-6 px-8 pb-8 justify-around">
    <!-- In Progress Column -->
    <div class="flex flex-col gap-4 w-[320px]">
      <div class="flex justify-between bg-[#4F46E5] text-white py-2 px-3 gap-3 rounded-full h-12 sticky top-0">
        <div class="flex gap-3.5">
          <span class="bg-[#ffffff] py-1.5 px-3 rounded-full text-lg items-center 
            flex justify-center w-10 h-8 text-[#4F46E5] font-semibold">25</span>
          <span class="items-center flex justify-center font-bold">In Progress</span>
        </div>
        <span class="items-center flex justify-center cursor-pointer">
          <Plus class="w-6" />
        </span>
      </div>
      <CardInProgress />

    </div>

    <!-- Reviewed Column -->
    <div class="flex flex-col gap-4 w-[320px]">
      <div class="flex justify-between bg-[#F59E0B] text-white py-2 px-3 gap-3 rounded-full h-12 sticky top-0">
        <div class="flex gap-3.5">
          <span class="bg-[#ffffff] py-1.5 px-3 rounded-full text-lg items-center 
            flex justify-center w-10 h-8 text-[#F59E0B] font-semibold">8</span>
          <span class="items-center flex justify-center font-bold">Reviewed</span>
        </div>
        <span class="items-center flex justify-center cursor-pointer">
          <Plus class="w-6" />
        </span>
      </div>
      <CardReviewed />
    </div>

    <!-- Completed Column -->
    <div class="flex flex-col gap-4 w-[320px]">
      <div class="flex justify-between bg-[#22C55E] text-white py-2 px-3 gap-3 rounded-full h-12 sticky top-0">
        <div class="flex gap-3.5">
          <span class="bg-[#ffffff] py-1.5 px-3 rounded-full text-lg items-center 
            flex justify-center w-10 h-8 text-[#22C55E] font-semibold">2</span>
          <span class="items-center flex justify-center font-bold">Completed</span>
        </div>
        <span class="items-center flex justify-center cursor-pointer">
          <Plus class="w-6" />
        </span>
      </div>
      <CardCompleted />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Plus } from 'lucide-vue-next';
import CardInProgress from './CardInProgress.vue';
import CardReviewed from './CardReviewed.vue';
import CardCompleted from './CardCompleted.vue';

</script>

<style></style>