<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue'
import { socket } from '@/socket'
import { useGameStore } from '@/stores/game'
import { computed } from 'vue'

const props = defineProps({
  answer: String,
})

const gameStore = useGameStore()
const buttonVariant = computed(() => {
  const { selectedAnswer, correctAnswer } = gameStore.game
  const { answer } = props

  if (!selectedAnswer)
    return 'default'
  if (!correctAnswer)
    return selectedAnswer === answer ? 'warning' : 'default'
  if (selectedAnswer === answer)
    return selectedAnswer === correctAnswer ? 'success' : 'danger'

  return answer === correctAnswer ? 'success' : 'default'
})

function answerQuestion() {
  socket.emit('game:answer_select', props.answer)
}
</script>

<template>
  <Button :variant="buttonVariant" class="w-full text-md font-bold py-6 px-2" :disabled="!gameStore.game.isUserTurn || !!gameStore.game.selectedAnswer" @click="answerQuestion">
    {{ answer }}
  </Button>
</template>
