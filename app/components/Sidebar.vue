<template>
  <v-navigation-drawer permanent elevation="0" class="border-e" :width="280">
    <div class="pa-4">
      <div class="flex items-center gap-2 mb-6">
        <img src="./../assets/image/Logo.png" width="100px" />
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
            <img src="./../assets/image/avatar-2.png" width="40" height="40" class="rounded-full" />
            <div>
              <div class="text-sm font-bold">Azunyan U. Wu</div>
              <div class="text-xs text-gray-500">Basic Member</div>
            </div>
          </div>
          <v-icon icon="mdi-logout" color="gray"></v-icon>
        </div>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
</script>

<style></style>

<script lang="ts" setup>

</script>

<style></style>