<script setup lang="ts">
import Footer from '@/components/Footer.vue'
import LoginButton from '@/components/LoginButton.vue'
import { useAuth } from '@/composables/useAuth'

const { loginWithGoogle } = useAuth()
</script>

<template>
  <div class="min-h-dvh flex flex-col justify-center items-center">
    <main class="w-full flex flex-col flex-1 justify-center items-center">
      <div class="flex flex-col flex-1 justify-center items-stretch space-y-4">
        <!-- <LoginButton text="Sign in with Facebook" icon="mdi:facebook" :callback="loginWithFacebook" />
        <Separator label="or" /> -->
        <LoginButton text="Sign in with Google" icon="mdi:google" :callback="loginWithGoogle" />
      </div>
    </main>
    <Footer />
  </div>
</template>

<style>
</style>
