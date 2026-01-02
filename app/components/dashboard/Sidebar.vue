<template>
  <!-- <client-only> -->
  <v-navigation-drawer permanent elevation="0" class="border-e sidebar" :width="280">
    <div class="pa-4">
      <div class="flex items-center gap-2 mb-6">
        <img src="./../../assets/image/Logo.png" width="100px" />
      </div>

      <v-text-field prepend-inner-icon="mdi-magnify" placeholder="Search..." variant="outlined" density="compact"
        rounded="pill"></v-text-field>
    </div>

    <v-list density="compact" nav>
      <div class="flex justify-between">
        <v-list-item prepend-icon="mdi-home-outline" title="Home" value="home"></v-list-item>
        <span class="flex justify-center items-center border border-[#A5B4FC] gap-1.5 px-3 rounded-full w-fit">10</span>
      </div>
      <v-list-item prepend-icon="mdi-format-list-bulleted" title="Tasks" value="tasks"></v-list-item>
      <div class="flex justify-between">
        <v-list-item prepend-icon="mdi-account" title="Users" value="users"></v-list-item>
        <span class="flex justify-center items-center border border-[#A5B4FC] gap-1.5 px-3 rounded-full w-fit">2</span>
      </div>
      <v-list-item prepend-icon="mdi-api" title="API" value="api"></v-list-item>
      <v-list-item prepend-icon="mdi-card-bulleted-outline" title="Subscription" value="subscription"></v-list-item>
      <v-list-item prepend-icon="mdi-cog-outline" title="Settings" value="settings"></v-list-item>
      <v-list-item prepend-icon="mdi-help-circle-outline" title="Help & Support" value="help"></v-list-item>
    </v-list>

    <template v-slot:append>
      <div class="pa-4 border-t">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <img src="./../../assets/image/avatar-2.png" width="40" height="40" class="rounded-full" />
            <div>
              <div class="text-sm font-bold">{{ user?.displayName }}</div>
              <div class="text-xs text-gray-500">Basic Member</div>
            </div>
          </div>
          <v-icon icon="mdi-logout" color="gray" class="cursor-pointer" @click="handleLogout"></v-icon>
        </div>
      </div>
    </template>
  </v-navigation-drawer>

  <!-- </client-only> -->
</template>

<script lang="ts" setup>
import { auth } from '~/configs/firebase';

const handleLogout = async () => {
  const { clear } = useUserSession()
  await clear()

  const router = useRouter()
  await router.push('/auth/sign-in')
  console.log('Logged out')
}
const user = auth.currentUser;
</script>

<style></style>

<style>
.v-navigation-drawer {
  width: 280px !important;
}

.sidebar {
  height: 100dvh;
  max-height: 100dvh;
  overflow: hidden;
}
</style>