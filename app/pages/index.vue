<script setup lang="ts">
const goToLogin = () => {
  navigateTo('/auth/sign-in');
};
</script>

<template>
  <div>
    Landing Page
    <button class="bg-black" @click="goToLogin">Login</button>
  </div>
</template>


<style></style>