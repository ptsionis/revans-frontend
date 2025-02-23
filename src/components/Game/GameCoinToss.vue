<script setup lang="ts">
import { useGameStore } from '@/stores/game'
import { ref } from 'vue'

const gameStore = useGameStore()
const coinBall = '/images/coin-ball.webp'
const coinGlove = '/images/coin-glove.webp'
const coinImg = ref(coinBall)
const isSpinning = ref(false)

coinImg.value = gameStore.game.isUserChallenger ? coinBall : coinGlove
setTimeout(() => {
  isSpinning.value = true
}, 3000)
setTimeout(() => {
  if (!gameStore.game.isUserTurn) {
    coinImg.value = coinImg.value === coinBall ? coinGlove : coinBall
  }
}, 5750)
setTimeout(() => {
  isSpinning.value = false
}, 6000)
</script>

<template>
  <div class="flex flex-col justify-center items-center space-y-8">
    <span>You have been assigned: {{ gameStore.game.isUserChallenger ? 'ball' : 'glove' }}.</span>
    <img :class="`${isSpinning ? 'animate-toss' : ''} w-16 md:w-20`" :src="coinImg" alt="">
  </div>
</template>
