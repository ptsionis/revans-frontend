<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue'
import { useSocket } from '@/composables/useSocket'
import { Icon } from '@iconify/vue'

const props = defineProps({
  id: String,
})

const { socket } = useSocket()

function acceptFriendRequest() {
  socket.emit('accept_friend_request', props.id)
}
</script>

<template>
  <Button size="icon" title="Accept" @click="acceptFriendRequest">
    <Icon icon="ic:round-done" />
  </Button>
</template>
