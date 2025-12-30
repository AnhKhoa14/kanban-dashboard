<script setup lang="ts">
import Navbar from './components/Navbar.vue';
import MainTabs from './components/MainTabs.vue';
import Sidebar from './components/Sidebar.vue';
// import Column from './components/Column.vue';
import Board from './components/Board.vue';
</script>

<template>
  <NuxtLayout>
    <v-app>
      <Sidebar />

      <v-main class="py-1">
        <Navbar />

        <MainTabs />
        <div class="px-6 py-4">
          <!-- <Column /> -->
          <Board />
        </div>
      </v-main>
    </v-app>
  </NuxtLayout>

</template>
