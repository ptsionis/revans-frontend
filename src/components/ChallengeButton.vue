<script setup lang="ts">
import { Icon } from '@iconify/vue'
import Button from './ui/button/Button.vue'

defineProps({
  id: String,
})
</script>

<template>
  <Button title="Play">
    <Icon icon="mingcute:sword-fill" />
  </Button>
</template>
