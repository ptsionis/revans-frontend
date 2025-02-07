<script setup lang="ts">
import { useAuth } from '@/composables/useAuth'
import { useSocket } from '@/composables/useSocket'
import { onBeforeMount, onMounted } from 'vue'

const { logout } = useAuth()
const { socket } = useSocket()
onBeforeMount(() => {
  socket.connect()
})
onMounted(() => {
  console.log(socket)
})
</script>

<template>
  <main>
    Home
    <button @click="logout">
      Logout
    </button>
  </main>
</template>
