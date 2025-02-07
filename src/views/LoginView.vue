<script setup lang="ts">
import { useAuth } from '@/composables/useAuth'

const { loginWithFacebook, loginWithGoogle } = useAuth()
</script>

<template>
  <div>
    Login
    <button @click="loginWithFacebook">
      Login with Facebook
    </button>
    <button @click="loginWithGoogle">
      Login with Google
    </button>
  </div>
</template>

<style>
</style>
