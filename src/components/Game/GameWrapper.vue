<script setup lang="ts">
import GameMain from '@/components/Game/GameMain.vue'
import GamePlayersIntro from '@/components/Game/GamePlayersIntro.vue'
import { ref } from 'vue'

const step = ref<'intro' | 'main' | null>('intro')
const welcomeDuration = 5000
const infoDuration = 5000
const tossDuration = 10000

setTimeout(() => {
  step.value = 'main'
}, welcomeDuration + infoDuration + tossDuration)
</script>

<template>
  <Transition name="fade" mode="out-in">
    <div v-if="step === 'intro'" class="flex flex-col flex-1 justify-center items-center">
      <GamePlayersIntro :welcome-duration="welcomeDuration" :info-duration="infoDuration" :toss-duration="tossDuration" />
    </div>
    <div v-else>
      <GameMain />
    </div>
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
