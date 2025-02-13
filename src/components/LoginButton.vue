<script setup lang="ts">
import type { PropType } from 'vue'
import Button from '@/components/ui/button/Button.vue'
import { Icon } from '@iconify/vue'

defineProps({
  text: String,
  icon: String,
  callback: Function as PropType<() => void>,
})
</script>

<template>
  <Button @click="callback">
    {{ text }} <Icon :icon="icon ?? ''" />
  </Button>
</template>
