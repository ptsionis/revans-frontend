<script setup lang="ts">
import { UserAvailability } from '@/enums/userAvailability'

const props = defineProps<{
  availability: string
}>()

function getAvailabilityColor() {
  switch (props.availability) {
    case UserAvailability.ONLINE:
      return 'bg-green-400'
    case UserAvailability.PENDING:
      return 'bg-yellow-400'
    case UserAvailability.INGAME:
      return 'bg-red-400'
    default:
      return 'bg-gray-400'
  }
}
</script>

<template>
  <div :class="`w-[15px] h-[15px] absolute -top-0.5 right-1 translate-x-1/2 rounded-full ${getAvailabilityColor()}`" />
</template>
