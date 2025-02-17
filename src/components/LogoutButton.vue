<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue'
import { useAuth } from '@/composables/useAuth'
import { LogOutIcon } from 'lucide-vue-next'

const { logout } = useAuth()
</script>

<template>
  <Button class="rounded-full px-3 py-5" title="Logout" @click="logout">
    <LogOutIcon />
  </Button>
</template>
