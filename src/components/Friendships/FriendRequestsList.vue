<script setup lang="ts">
import FriendRequestorSlot from '@/components/Friendships/FriendRequestorSlot.vue'
import ScrollArea from '@/components/ui/scroll-area/ScrollArea.vue'
import { useFriendshipsStore } from '@/stores/friendships'

const friendshipsStore = useFriendshipsStore()
</script>

<template>
  <ScrollArea class="w-full h-[200px] list-none rounded-none">
    <ul>
      <li v-for="request in friendshipsStore.friendRequests" :key="request.id">
        <FriendRequestorSlot :profile="request" />
      </li>
    </ul>
  </ScrollArea>
</template>
