<script setup lang="ts">
import type { UserInterface } from '@/types/user'
import ScrollArea from '@/components/ui/scroll-area/ScrollArea.vue'
import { QuestionCategory } from '@/enums/questionCategory'
import { getCategoryWinrate } from '@/utils/rank'
import ProfileCategoryWinrateBar from './ProfileCategoryWinrateBar.vue'

defineProps<{
  profile: UserInterface
}>()
</script>

<template>
  <ScrollArea class="w-full h-[170px] py-4">
    <ul class="list-none grid grid-cols-2 sm:grid-cols-3 gap-2">
      <li v-for="category in Object.values(QuestionCategory).filter(c => c !== '')" :key="category">
        <ProfileCategoryWinrateBar :category="category" :winrate="getCategoryWinrate(profile, category)" />
      </li>
    </ul>
  </ScrollArea>
</template>
