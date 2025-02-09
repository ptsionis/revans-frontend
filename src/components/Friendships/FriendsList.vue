<script setup lang="ts">
import ChallengeButton from '@/components/ChallengeButton.vue'
import ProfileDialog from '@/components/ProfileDialog.vue'
import ScrollArea from '@/components/ui/scroll-area/ScrollArea.vue'
import { useFriendshipsStore } from '@/stores/friendships'

const friendshipsStore = useFriendshipsStore()
</script>

<template>
  <ScrollArea class="list-none">
    <li v-for="friendship in friendshipsStore.friendships" :key="friendship.id" class="flex justify-between items-center p-4 bg-background border border-muted rounded-md">
      <ProfileDialog :id="friendship.id" :is-user-profile="false" :name="friendship.name" :picture-url="friendship.pictureUrl ?? ''" :score="friendship.score" :created-at="friendship.createdAt" />
      <div>
        <ChallengeButton />
      </div>
    </li>
  </ScrollArea>
</template>
