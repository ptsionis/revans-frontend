<script setup lang="ts">
import GameAllCategories from '@/components/Game/GameAllCategories.vue'
import GameBoard from '@/components/Game/GameBoard.vue'
import GameEnd from '@/components/Game/GameEnd.vue'
import GameIntro from '@/components/Game/GameIntro.vue'
import GameQuestion from '@/components/Game/GameQuestion.vue'
import GameTimer from '@/components/Game/GameTimer.vue'
import { useGameStore } from '@/stores/game'

const gameStore = useGameStore()
const welcomeDuration = 5000
const infoDuration = 5000
const tossDuration = 10000

setTimeout(() => {
  gameStore.game.status.state = 'categories'
}, welcomeDuration + infoDuration + tossDuration)
</script>

<template>
  <div class="w-full flex flex-col flex-1 justify-center items-center space-y-8">
    <GameBoard v-if="gameStore.game.status.state === 'categories' || gameStore.game.status.state === 'question'" />
    <GameIntro v-if="gameStore.game.status.state === 'intro'" :welcome-duration="welcomeDuration" :info-duration="infoDuration" :toss-duration="tossDuration" />
    <GameAllCategories v-else-if="gameStore.game.status.state === 'categories'" />
    <GameQuestion v-else-if="gameStore.game.status.state === 'question'" />
    <GameEnd v-else-if="gameStore.game.status.state === 'end'" />
    <GameTimer v-if="gameStore.game.status.state === 'categories' || gameStore.game.status.state === 'question'" />
  </div>
</template>
