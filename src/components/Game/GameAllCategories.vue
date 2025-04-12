<script setup lang="ts">
import GameCategoryButton from '@/components/Game/GameCategoryButton.vue'
import { QuestionCategory } from '@/enums/questionCategory'
import { QuestionLevel } from '@/enums/questionLevel'
import { useGameStore } from '@/stores/game'

const gameStore = useGameStore()
const categories = Object.values(QuestionCategory).filter(category => category !== '')
const levels = Object.values(QuestionLevel).filter(level => level !== '')

function questionHasBeenPlayed(category: QuestionCategory, level: QuestionLevel) {
  return gameStore.game.playedQuestions.some(question => question.category === category && question.level === level)
}
</script>

<template>
  <div class="flex-1 flex flex-col justify-center items-center px-12 space-y-8">
    <div v-for="category in categories" :key="category" class="w-full flex flex-col md:flex-row justify-center items-center space-x-0 md:space-x-8 space-y-8 md:space-y-0">
      <template v-for="level in levels" :key="`${category}-${level}`">
        <GameCategoryButton
          v-if="!questionHasBeenPlayed(category, level)"
          :category="category"
          :level="level"
        />
      </template>
    </div>
  </div>
</template>
