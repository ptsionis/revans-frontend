<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue'
import { socket } from '@/socket'
import { useGameStore } from '@/stores/game'

const props = defineProps({
  answer: String,
})

const gameStore = useGameStore()

function answerQuestion() {
  socket.emit('game:answer', props.answer)
}
</script>

<template>
  <Button class="w-full text-md font-bold py-6 px-2" :disabled="!gameStore.game.isUserTurn" @click="answerQuestion">
    {{ answer }}
  </Button>
</template>
