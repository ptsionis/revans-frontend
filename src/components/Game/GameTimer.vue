<script setup lang="ts">
import { useGameStore } from '@/stores/game'
import { computed } from 'vue'

const gameStore = useGameStore()
const color = computed(() => {
  if (!gameStore.game.isUserTurn) {
    return 'bg-muted text-muted-foreground'
  }
  else if (gameStore.game.timer <= 10) {
    return 'bg-danger text-danger-foreground'
  }
  else {
    return 'bg-warning text-warning-foreground'
  }
})

const isPinging = computed(() => {
  return gameStore.game.timer <= 10 && gameStore.game.isUserTurn && !gameStore.game.selectedAnswer
})
</script>

<template>
  <span class="absolute top-[50%] left-0 flex size-3">
    <span :class="`absolute rounded-r-full p-4 opacity-75 ${color} ${isPinging ? 'animate-ping' : ''}`" />
    <span :class="`relative size-3 rounded-r-full p-4 flex justify-center items-center font-bold ${color}`">{{ gameStore.game.isUserTurn ? gameStore.game.timer : '-' }}</span>
  </span>
</template>
