<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue'
import { socket } from '@/socket'
import { SwordIcon } from 'lucide-vue-next'

const props = defineProps({
  id: { type: String, required: true },
})

function challenge() {
  socket.emit('challenge:create', props.id)
}
</script>

<template>
  <Button size="icon" title="Play" @click="challenge">
    <SwordIcon />
  </Button>
</template>
