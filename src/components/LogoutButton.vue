<script setup lang="ts">
import { useAuth } from '@/composables/useAuth'
import { Icon } from '@iconify/vue'
import Button from './ui/button/Button.vue'

const { logout } = useAuth()
</script>

<template>
  <Button class="rounded-full px-3 py-5" title="Logout" @click="logout">
    <Icon icon="mdi:logout" />
  </Button>
</template>
