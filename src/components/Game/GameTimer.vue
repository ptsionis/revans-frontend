<script setup lang="ts">
import { useGameStore } from '@/stores/game'

const gameStore = useGameStore()
</script>

<template>
  <div :class="`absolute top-[50%] left-0 font-extrabold p-2 border rounded-r-full ${!gameStore.game.isUserTurn ? 'bg-muted text-muted-foreground' : gameStore.game.timer < 10 ? 'bg-danger text-danger-foreground animate-ping' : 'bg-warning text-warning-foreground'}`">
    <span>{{ gameStore.game.isUserTurn ? gameStore.game.timer : '-' }}</span>
  </div>
</template>
