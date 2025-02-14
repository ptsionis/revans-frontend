<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue'
import { socket } from '@/socket'
import { Icon } from '@iconify/vue'

const props = defineProps({
  id: String,
})

function deleteFriendRequest() {
  socket.emit('delete_friend_request', props.id)
}
</script>

<template>
  <Button size="icon" title="Delete" @click="deleteFriendRequest">
    <Icon icon="ic:round-delete" />
  </Button>
</template>
