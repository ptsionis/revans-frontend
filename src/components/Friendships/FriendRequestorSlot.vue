<script setup lang="ts">
import ProfileDialog from '@/components/ProfileDialog.vue'
import FriendRequestAcceptButton from './FriendRequestAcceptButton.vue'
import FriendRequestDeleteButton from './FriendRequestDeleteButton.vue'

defineProps<{
  id: string
  name: string
  pictureUrl: string
  score: number
  gamesPlayed: number
  gamesWon: number
  createdAt: string
}>()
</script>

<template>
  <div class="flex justify-between items-center p-4 bg-background border border-muted">
    <ProfileDialog :id="id" :is-user-profile="false" :name="name" :picture-url="pictureUrl ?? ''" :score="score" :games-played="gamesPlayed" :games-won="gamesWon" :created-at="createdAt" />
    <div class="flex space-x-2">
      <FriendRequestAcceptButton :id="id" />
      <FriendRequestDeleteButton :id="id" />
    </div>
  </div>
</template>
