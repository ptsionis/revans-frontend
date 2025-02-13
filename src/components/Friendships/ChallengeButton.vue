<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue'
import { Icon } from '@iconify/vue'

defineProps({
  id: String,
})
</script>

<template>
  <Button title="Play">
    <Icon icon="mingcute:sword-fill" />
  </Button>
</template>
