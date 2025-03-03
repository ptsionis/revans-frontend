<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue'
import { socket } from '@/socket'

function challengeOpen() {
  socket.emit('challenge:open')
}
</script>

<template>
  <Button class="rounded text-lg" size="xl" @click="challengeOpen">
    PLAY
  </Button>
</template>
