<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue'
import { socket } from '@/socket'
import { UserPlus2Icon } from 'lucide-vue-next'

const props = defineProps({
  id: String,
})

function acceptFriendRequest() {
  socket.emit('friendship:accept_friend_request', props.id)
}
</script>

<template>
  <Button size="icon" title="Accept" @click="acceptFriendRequest">
    <UserPlus2Icon />
  </Button>
</template>
