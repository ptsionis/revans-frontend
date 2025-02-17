<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue'
import { socket } from '@/socket'
import { XIcon } from 'lucide-vue-next'

function declineChallenge() {
  socket.emit('challenge:decline')
}
</script>

<template>
  <Button title="Decline" @click="declineChallenge">
    <XIcon />
  </Button>
</template>
