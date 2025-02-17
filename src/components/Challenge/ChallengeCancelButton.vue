<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue'
import { socket } from '@/socket'
import { XIcon } from 'lucide-vue-next'

function cancelChallenge() {
  socket.emit('challenge:cancel')
}
</script>

<template>
  <Button title="Cancel" @click="cancelChallenge">
    <XIcon />
  </Button>
</template>
