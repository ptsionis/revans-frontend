<script setup lang="ts">
import ChallengeButton from '@/components/Friendships/ChallengeButton.vue'
import ProfileDialog from '@/components/ProfileDialog.vue'
import { UserAvailability } from '@/enums/userAvailability'

defineProps<{
  id: string
  name: string
  availability?: string
  pictureUrl: string
  score: number
  createdAt: string
}>()
</script>

<template>
  <div class="flex justify-between items-center p-4 bg-background border border-muted rounded-md">
    <ProfileDialog :id="id" :availability="availability ?? UserAvailability.OFFLINE" :is-user-profile="false" :name="name" :picture-url="pictureUrl ?? ''" :score="score" :created-at="createdAt" />
    <div>
      <ChallengeButton v-if="availability === UserAvailability.ONLINE" />
    </div>
  </div>
</template>
