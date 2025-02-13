<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue'
import { useAuth } from '@/composables/useAuth'
import { Icon } from '@iconify/vue'

const { logout } = useAuth()
</script>

<template>
  <Button class="rounded-full px-3 py-5" title="Logout" @click="logout">
    <Icon icon="mdi:logout" />
  </Button>
</template>
