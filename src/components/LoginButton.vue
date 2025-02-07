<script setup lang="ts">
import type { PropType } from 'vue'
import { Icon } from '@iconify/vue'
import Button from './ui/button/Button.vue'

defineProps({
  text: String,
  icon: String,
  callback: Function as PropType<() => void>,
})
</script>

<template>
  <Button @click="callback">
    {{ text }} <Icon :icon="icon ? icon : ''" />
  </Button>
</template>
