<script setup lang="ts">
import FriendSlot from '@/components/Friendships/FriendSlot.vue'
import ScrollArea from '@/components/ui/scroll-area/ScrollArea.vue'
import { useFriendshipsStore } from '@/stores/friendships'

const friendshipsStore = useFriendshipsStore()
</script>

<template>
  <ScrollArea class="w-full h-[200px] list-none rounded-none">
    <ul>
      <li v-for="friendship in friendshipsStore.friendships" :key="friendship.id">
        <FriendSlot :profile="friendship" />
      </li>
    </ul>
  </ScrollArea>
</template>
