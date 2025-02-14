<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue'
import { socket } from '@/socket'
import { Icon } from '@iconify/vue'

const props = defineProps({
  id: String,
})

function acceptFriendRequest() {
  socket.emit('friendship:accept_friend_request', props.id)
}
</script>

<template>
  <Button size="icon" title="Accept" @click="acceptFriendRequest">
    <Icon icon="ic:round-done" />
  </Button>
</template>
