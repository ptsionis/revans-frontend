<script setup lang="ts">
import type { QuestionCategory } from '@/enums/questionCategory'
import type { QuestionLevel } from '@/enums/questionLevel'
import Button from '@/components/ui/button/Button.vue'
import { socket } from '@/socket'
import { useGameStore } from '@/stores/game'

const props = defineProps<{
  category: QuestionCategory
  level: QuestionLevel
}>()

const gameStore = useGameStore()

function getQuestion() {
  socket.emit('game:get_question', {
    category: props.category,
    level: props.level,
  })
}
</script>

<template>
  <Button class="w-full font-bold text-md py-6 px-2" :title="`${category} X${level}`" :disabled="!gameStore.game.isUserTurn || gameStore.game.playedQuestions.some(question => question.category === category && question.level === level)" @click="getQuestion">
    {{ category }} X{{ level }}
  </Button>
</template>
