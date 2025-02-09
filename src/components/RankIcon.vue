<script setup lang="ts">
import { useRank } from '@/composables/useRank'
import { useUserStore } from '@/stores/user'
import { Icon } from '@iconify/vue'

const userStore = useUserStore()

const { rank } = useRank(userStore.user.score)
</script>

<template>
  <Icon :icon="rank" />
</template>
