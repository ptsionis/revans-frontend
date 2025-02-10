<script setup lang="ts">
import { useFriendship } from '@/composables/useFriendship'

function getCounter(): number {
  const { onlineFriendsCounter, friendRequestsCounter } = useFriendship()
  return friendRequestsCounter.value + onlineFriendsCounter.value
}
</script>

<template>
  <span class="absolute -top-2 right-0.5 translate-x-1/2 bg-destructive text-destructive-foreground px-2 py-1 rounded-full text-xs">{{ getCounter() }}</span>
</template>
