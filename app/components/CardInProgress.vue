<template>
  <div class="flex flex-col gap-3">
    <v-card elevation="0" v-for="card in inProgressCards" :key="card.title" rounded="xl"
      class="flex flex-col border border-[#E2E8F0] shadow-[#1717171A] gap-3">
      <v-card-subtitle :class="[
        'rounded-full w-fit mt-3 ml-3 h-6 text-[11px] font-bold px-3 flex items-center justify-center border-none',
        getTagClass(card.tag)
      ]">
        {{ card.tag }}
      </v-card-subtitle>
      <v-card-title class="font-bold" style="font-size: 16px; line-height: 1.4; white-space: normal">{{ card.title }}</v-card-title>
      <v-card-text class="text-[#475569]">{{ card.description }}</v-card-text>
      <div class="flex justify-between items-center px-4 pb-4">
        <div class="flex flex-row-reverse justify-end italic"> <v-avatar v-for="(img, index) in card.avatars"
            :key="index" size="32" class="border-2 border-white -ml-3 first:ml-0">
            <v-img :src="img" alt="Avatar" />
          </v-avatar>

          <v-avatar v-if="card.avatars.length > 4" size="32" color="#EEF2FF"
            class="border-2 border-white -ml-3 text-[10px] font-bold text-[#4F46E5]">
            +{{ card.avatars.length - 4 }}
          </v-avatar>
        </div>

        <div class="flex gap-4 text-sm text-[#94A3B8] font-medium">
          <span class="flex items-center gap-1.5">
            <MessageCircleMore :size="18" /> {{ card.comments }}
          </span>
          <span class="flex items-center gap-1.5">
            <CircleCheck :size="18" /> {{ card.likes }}
          </span>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script lang="ts" setup>

import { CircleCheck, MessageCircleMore } from 'lucide-vue-next';
import { cardData } from './../../content/data'
const inProgressCards = cardData.filter(card => card.status === 'inProgress');

const getTagClass = (tag: string) => {
  switch (tag) {
    case 'High Priority':
      return 'bg-[#FFF1F2] text-[#F43F5E]';
    case 'Important':
      return 'bg-[#EEF2FF] text-[#4F46E5]';
    case 'Low Priority':
      return 'bg-[#F0FDF4] text-[#22C55E]';
    case 'Meh':
      return 'bg-[#EEF2FF] text-[#4F46E5]';
    case 'Not that important':
      return 'bg-[#FFF1F2] text-[#F43F5E]';
    case 'OK':
      return 'bg-[#FFFBEB] text-[#F59E0B]'
    case 'I dont know':
      return 'bg-[#FFFBEB] text-[#F59E0B]'
    default:
      return 'bg-white text-[#475569] border-[#CBD5E1]';
  }
};
</script>

<style></style>