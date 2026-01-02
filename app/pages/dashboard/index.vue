<script setup lang="ts">
import Board from '~/components/homePage/Board.vue';
import MainTabs from '~/components/homePage/MainTabs.vue';

definePageMeta({
  layout: false,
});
</script>

<template>
  <div>
    <NuxtLayout name="dashboard">
      <MainTabs />
      <Board />
    </NuxtLayout>

  </div>
</template>


<style>
  
</style>