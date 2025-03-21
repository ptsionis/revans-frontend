<script setup lang="ts">
import { useGameStore } from '@/stores/game'
import GameAnswerButton from './GameAnswerButton.vue'
import GameQuestionMetadata from './GameQuestionMetadata.vue'

const gameStore = useGameStore()
</script>

<template>
  <div class="w-full flex-1 flex flex-col justify-center items-center space-y-16">
    <div class="flex flex-col justify-center items-center space-y-6">
      <h3 class="font-extrabold text-xl text-center">
        {{ gameStore.game.currentQuestion?.question }}
      </h3>
      <img v-if="gameStore.game.currentQuestion?.imageUrl" class="w-36 rounded-md bg-secondary" :src="gameStore.game.currentQuestion?.imageUrl" alt="">
      <GameQuestionMetadata />
    </div>
    <div class="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
      <GameAnswerButton v-for="answer in gameStore.game.currentQuestion?.answers" :key="answer" :answer="answer" />
    </div>
  </div>
</template>
