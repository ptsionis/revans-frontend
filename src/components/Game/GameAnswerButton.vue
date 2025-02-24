<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue'
import { socket } from '@/socket'

const props = defineProps({
  answer: String,
})

function answerQuestion() {
  socket.emit('game:answer', props.answer)
}
</script>

<template>
  <Button @click="answerQuestion">
    {{ answer }}
  </Button>
</template>
