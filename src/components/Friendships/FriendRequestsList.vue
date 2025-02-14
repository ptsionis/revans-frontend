<script setup lang="ts">
import FriendRequestorSlot from '@/components/Friendships/FriendRequestorSlot.vue'
import ScrollArea from '@/components/ui/scroll-area/ScrollArea.vue'
import { useFriendRequestsStore } from '@/stores/friendRequests'

const friendRequestsStore = useFriendRequestsStore()
</script>

<template>
  <ScrollArea class="list-none">
    <li v-for="request in friendRequestsStore.friendRequests" :key="request.id">
      <FriendRequestorSlot :id="request.id" :name="request.name" :availability="request.availability" :picture-url="request.pictureUrl ?? ''" :score="request.score" :created-at="request.createdAt" />
    </li>
  </ScrollArea>
</template>
