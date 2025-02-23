<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

defineProps({
  name: { type: String, required: true },
  pictureUrl: String,
},
)
</script>

<template>
  <div class="flex flex-col flex-1 justify-center items-center space-y-4">
    <Avatar>
      <AvatarImage :src="pictureUrl ?? ''" :alt="name" />
      <AvatarFallback>{{ name.slice(0, 1) }}</AvatarFallback>
    </Avatar>
    <span class="block max-w-[115px] text-center truncate" :title="name.split(' ')[0]">{{ name.split(' ')[0] }}</span>
  </div>
</template>
