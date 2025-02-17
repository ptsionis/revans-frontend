<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue'
import { socket } from '@/socket'
import { CheckIcon } from 'lucide-vue-next'

function acceptChallenge() {
  socket.emit('challenge:accept')
}
</script>

<template>
  <Button title="Accept" @click="acceptChallenge">
    <CheckIcon />
  </Button>
</template>
