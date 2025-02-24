<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const props = defineProps<{
  name: string
  pictureUrl?: string
  points: number
  isUser: boolean
}>()
</script>

<template>
  <div :class="`w-full px-4 flex justify-between items-center text-lg ${props.isUser ? '' : 'flex-row-reverse'}`">
    <div :class="`flex items-center space-x-4 ${props.isUser ? '' : 'flex-row-reverse space-x-reverse'}`">
      <Avatar>
        <AvatarImage :src="pictureUrl ?? ''" :alt="name" />
        <AvatarFallback>{{ name.slice(0, 1) }}</AvatarFallback>
      </Avatar>
      <span class="hidden md:block">{{ name.split(" ")[0] }}</span>
    </div>
    <span class="font-black text-3xl">{{ points }}</span>
  </div>
</template>
