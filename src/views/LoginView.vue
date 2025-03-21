<script setup lang="ts">
import Footer from '@/components/Footer.vue'
import LoginButton from '@/components/LoginButton.vue'
import Logo from '@/components/Logo.vue'
import { useAuth } from '@/composables/useAuth'

const { loginWithGoogle } = useAuth()
</script>

<template>
  <div class="min-h-dvh flex flex-col justify-center items-center">
    <main class="w-full flex flex-col justify-center items-center flex-1 px-12 py-8">
      <div class="flex flex-col justify-center items-center space-y-12">
        <Logo />
        <div class="flex flex-col flex-1 justify-center items-stretch space-y-4">
          <!-- <LoginButton text="Sign in with Facebook" icon="mdi:facebook" :callback="loginWithFacebook" /> -->
          <LoginButton text="Sign in with Google" icon="mdi:google" :callback="loginWithGoogle" />
          <span class="text-xs font-thin text-muted-foreground">Login via Facebook is currently unavailable.</span>
        </div>
      </div>
    </main>
    <Footer />
  </div>
</template>

<style>
</style>
