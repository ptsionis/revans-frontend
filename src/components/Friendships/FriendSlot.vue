<script setup lang="ts">
import ChallengeButton from '@/components/Challenge/ChallengeButton.vue'
import ProfileDialog from '@/components/ProfileDialog.vue'
import { UserAvailability } from '@/enums/userAvailability'
import { useUserStore } from '@/stores/user'

defineProps<{
  id: string
  name: string
  availability?: string
  pictureUrl: string
  score: number
  gamesPlayed: number
  gamesWon: number
  createdAt: string
}>()

const userStore = useUserStore()
</script>

<template>
  <div class="flex justify-between items-center p-4 bg-background border border-muted">
    <ProfileDialog :id="id" :availability="availability ?? UserAvailability.OFFLINE" :is-user-profile="false" :name="name" :picture-url="pictureUrl ?? ''" :score="score" :games-played="gamesPlayed" :games-won="gamesWon" :created-at="createdAt" />
    <div>
      <ChallengeButton v-if="availability === UserAvailability.ONLINE && userStore.user.availability === UserAvailability.ONLINE" :id="id" />
    </div>
  </div>
</template>
