<script setup lang="ts">
import Navbar from './components/Navbar.vue';
import MainTabs from './components/MainTabs.vue';
import Sidebar from './components/Sidebar.vue';
import Column from './components/Column.vue';
</script>

<template>
  <NuxtLayout>
    <v-app>
      <Sidebar />

      <Navbar />
      <v-main class="py-1">
        <MainTabs />
        <div class="px-6 py-4">
          <Column />
        </div>
      </v-main>
    </v-app>
  </NuxtLayout>

</template>
