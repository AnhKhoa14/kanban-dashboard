<template>
  <v-app class="dashboard-root">
    <Sidebar />

    <v-main class="dashboard-main">
      <Navbar />

      <div class="dashboard-content">
        <slot />
      </div>
    </v-main>
  </v-app>
</template>


<script lang="ts" setup>
import Navbar from '~/components/dashboard/Navbar.vue';
import Sidebar from '~/components/dashboard/Sidebar.vue';


</script>

<style>
.dashboard-root {
  height: 100dvh;
  overflow: hidden;
}

.dashboard-main {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.dashboard-content {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
}
</style>