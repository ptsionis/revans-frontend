<script setup lang="ts">
import { useGameStore } from '@/stores/game'
import { useUserStore } from '@/stores/user'
import FadeTransition from '../FadeTransition.vue'

const userStore = useUserStore()
const gameStore = useGameStore()
</script>

<template>
  <FadeTransition>
    <div v-if="!gameStore.game.status.winnerId">
      DRAW
    </div>
    <div v-else-if="gameStore.game.status.winnerId === userStore.user.id">
      WIN
    </div>
    <div v-else>
      DEFEAT
    </div>
  </FadeTransition>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
