<script setup lang="ts">
import { useGameStore } from '@/stores/game'
import GameAnswerButton from './GameAnswerButton.vue'

const gameStore = useGameStore()
</script>

<template>
  <div class="w-full flex flex-col justify-center items-center space-y-12">
    <h3 class="font-bold text-xl">
      {{ gameStore.game.currentQuestion?.question }}
    </h3>
    <img class="w-36 rounded-md" src="https://tenereteam.s3.us-west-1.amazonaws.com/ac-milan-store-logo-6?v=1740358370" alt="">
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      <GameAnswerButton v-for="answer in gameStore.game.currentQuestion?.answers" :key="answer" :answer="answer" />
    </div>
  </div>
</template>
