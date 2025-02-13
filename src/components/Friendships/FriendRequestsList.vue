<script setup lang="ts">
import FriendRequestorSlot from '@/components/Friendships/FriendRequestorSlot.vue'
import ScrollArea from '@/components/ui/scroll-area/ScrollArea.vue'
import { useFriendshipsStore } from '@/stores/friendships'

const friendshipsStore = useFriendshipsStore()
</script>

<template>
  <ScrollArea class="list-none">
    <li v-for="request in friendshipsStore.friendRequests" :key="request.id">
      <FriendRequestorSlot :id="request.id" :name="request.name" :availability="request.availability" :picture-url="request.pictureUrl ?? ''" :score="request.score" :created-at="request.createdAt" />
    </li>
  </ScrollArea>
</template>
