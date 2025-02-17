<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue'
import { socket } from '@/socket'
import { Trash2Icon } from 'lucide-vue-next'

const props = defineProps({
  id: String,
})

function deleteFriendRequest() {
  socket.emit('friendship:delete_friend_request', props.id)
}
</script>

<template>
  <Button size="icon" title="Delete" @click="deleteFriendRequest">
    <Trash2Icon />
  </Button>
</template>
