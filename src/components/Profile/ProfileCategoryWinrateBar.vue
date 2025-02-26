<script setup lang="ts">
import CircleProgress from 'vue3-circle-progress'
import 'vue3-circle-progress/dist/circle-progress.css'

defineProps({
  category: String,
  winrate: Number,
})
</script>

<template>
  <div class="flex flex-col justify-center items-center space-y-4 p-4 bg-background border border-muted rounded-md">
    <span class="w-full text-center text-xs">{{ category }} %</span>
    <CircleProgress :percent="winrate" :size="70" :border-width="10" :border-bg-width="10" empty-color="hsl(var(--primary-foreground))" fill-color="hsl(var(--primary))" show-percent />
  </div>
</template>
