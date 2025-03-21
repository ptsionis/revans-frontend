<script setup lang="ts">
import { useAuth } from '@/composables/useAuth'

const { isAuthenticated } = useAuth()
</script>

<template>
  <div class="flex flex-col justify-center items-center space-y-4">
    <img src="/images/logo/logo-128.webp" alt="Revans">
    <h1 v-if="!isAuthenticated" class="max-w-[700px] text-center text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-bold">
      Play a real-time PvP football quiz against your friends.
    </h1>
    <span v-if="isAuthenticated" class="text-danger text-center text-xs md:text-sm font-light">Revans is currently in Alpha version and game data may be lost!</span>
  </div>
</template>
