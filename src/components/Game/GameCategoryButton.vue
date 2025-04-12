<script setup lang="ts">
import type { QuestionCategory } from '@/enums/questionCategory'
import type { QuestionLevel } from '@/enums/questionLevel'
import Button from '@/components/ui/button/Button.vue'
import { socket } from '@/socket'
import { useGameStore } from '@/stores/game'
import { getQuestionLevelPoints } from '@/utils/game'
import { computed } from 'vue'

const props = defineProps<{
  category: QuestionCategory
  level: QuestionLevel
}>()

const gameStore = useGameStore()

const isDisabled = computed(() => {
  return !gameStore.game.isUserTurn || gameStore.game.playedQuestions.some(question => question.category === props.category && question.level === props.level)
})

function getQuestion() {
  socket.emit('game:get_question', {
    category: props.category,
    level: props.level,
  })
}
</script>

<template>
  <Button
    class="w-full font-bold text-sm md:text-md py-6 px-2"
    :title="`${category} X${level}`" :disabled="isDisabled" @click="getQuestion"
  >
    {{ category.replace(/_/g, ' ') }} X{{ getQuestionLevelPoints(level) }}
  </Button>
</template>
