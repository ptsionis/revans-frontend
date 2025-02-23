<script setup lang="ts">
import GameCoinToss from '@/components/Game/GameCoinToss.vue'
import PlayerInfoSlot from '@/components/PlayerInfoSlot.vue'
import { useGameStore } from '@/stores/game'
import { useUserStore } from '@/stores/user'
import { ref } from 'vue'

const props = defineProps<{
  welcomeDuration: number
  infoDuration: number
  tossDuration: number
}>()

const userStore = useUserStore()
const gameStore = useGameStore()
const step = ref<'welcome' | 'info' | 'coinToss' | null>('welcome')

setTimeout(() => {
  step.value = 'info'
}, props.welcomeDuration)

setTimeout(() => {
  step.value = 'coinToss'
}, props.welcomeDuration + props.infoDuration)

setTimeout(() => {
  step.value = null
}, props.welcomeDuration + props.infoDuration + props.tossDuration + 1000)
</script>

<template>
  <Transition appear name="fade" mode="out-in">
    <span v-if="step === 'welcome'">Game is starting...</span>
    <div v-else-if="step === 'info'" class="flex flex-col lg:flex-row justify-center items-center space-x-0 space-y-8 lg:space-x-8 lg:space-y-0">
      <PlayerInfoSlot :name="userStore.user.name" :picture-url="userStore.user.pictureUrl ?? undefined" />
      <span class="font-extrabold text-2xl">vs</span>
      <PlayerInfoSlot :name="gameStore.game.opponent.name" :picture-url="gameStore.game.opponent?.pictureUrl ?? undefined" />
    </div>
    <GameCoinToss v-else-if="step === 'coinToss'" />
  </Transition>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
