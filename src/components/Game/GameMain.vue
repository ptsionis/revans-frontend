<script setup lang="ts">
import GameAllCategories from '@/components/Game/GameAllCategories.vue'
import GameBoard from '@/components/Game/GameBoard.vue'
import { useGameStore } from '@/stores/game'
import GameQuestion from './GameQuestion.vue'
import GameTimer from './GameTimer.vue'

const gameStore = useGameStore()
</script>

<template>
  <div class="w-full flex flex-col flex-1 justify-center items-center space-y-8">
    <GameBoard />
    <GameAllCategories v-if="!gameStore.game.currentQuestion?.question" />
    <GameQuestion v-else />
    <GameTimer />
  </div>
</template>
