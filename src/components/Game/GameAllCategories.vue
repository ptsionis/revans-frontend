<script setup lang="ts">
import GameCategoryButton from '@/components/Game/GameCategoryButton.vue'
import { QuestionCategory } from '@/enums/questionCategory'
import { QuestionLevel } from '@/enums/questionLevel'

const categories = Object.values(QuestionCategory).filter(category => category !== '')
const levels = Object.values(QuestionLevel).filter(level => level !== '')
</script>

<template>
  <div class="flex-1 flex flex-col justify-center items-center space-y-8">
    <div v-for="category in categories" :key="category" class="w-full flex flex-col md:flex-row justify-center items-center space-x-0 md:space-x-8 space-y-8 md:space-y-0">
      <GameCategoryButton v-for="level in levels" :key="`${category}-${level}`" :category="category" :level="level" />
    </div>
  </div>
</template>
