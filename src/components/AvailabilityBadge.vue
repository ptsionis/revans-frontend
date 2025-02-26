<script setup lang="ts">
import { UserAvailability } from '@/enums/userAvailability'

const props = defineProps<{
  availability: string
}>()

function getAvailabilityColor() {
  switch (props.availability) {
    case UserAvailability.ONLINE:
      return 'bg-success'
    case UserAvailability.PENDING:
      return 'bg-warning'
    case UserAvailability.INGAME:
      return 'bg-danger'
    default:
      return 'bg-muted'
  }
}
</script>

<template>
  <div :class="`w-[15px] h-[15px] absolute -top-0.5 right-1 translate-x-1/2 rounded-full ${getAvailabilityColor()}`" />
</template>
