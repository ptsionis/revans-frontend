<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useFriendshipsStore } from '@/stores/friendships'
import ScrollArea from '../ui/scroll-area/ScrollArea.vue'

const friendshipsStore = useFriendshipsStore()
</script>

<template>
  <ScrollArea class="list-none">
    <li v-for="friendship in friendshipsStore.friendships" :key="friendship.id" class="flex justify-between items-center p-4 bg-background border border-muted rounded-md">
      <div class="flex items-center space-x-4">
        <div>
          <Avatar>
            <AvatarImage :src="friendship.pictureUrl ? friendship.pictureUrl : ''" :alt="friendship.name" />
            <AvatarFallback>{{ friendship.name.slice(0, 1) }}</AvatarFallback>
          </Avatar>
        </div>
        <span>{{ friendship.name }}</span>
      </div>
      <div>
        Buttons
      </div>
    </li>
  </ScrollArea>
</template>
