<script setup lang="ts">
import { useRank } from '@/composables/useRank'
import { Icon } from '@iconify/vue'

const props = defineProps<{
  rank: number
}>()

const { rank } = useRank(props.rank)
</script>

<template>
  <Icon :icon="rank" />
</template>
