<script setup lang="ts">
import type { UserInterface } from '@/types/user'
import Footer from '@/components/Footer.vue'
import FriendListDialog from '@/components/FriendListDialog.vue'
import LogoutButton from '@/components/LogoutButton.vue'
import { useSocket } from '@/composables/useSocket'
import { useUserStore } from '@/stores/user'
import { onBeforeMount, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const { socket } = useSocket()
const userStore = useUserStore()

onBeforeMount(() => {
  if (router.currentRoute.value.hash === '#_=_') {
    router.replace({ hash: '' })
  }
  socket.connect()
})

onMounted(() => {
  socket.on('user_init', (data: UserInterface) => {
    userStore.setUserStore(data)
  })
})
</script>

<template>
  <div class="min-h-dvh flex flex-col justify-center items-center">
    <main class="w-full flex flex-col flex-1 px-12 py-8">
      <div class="flex flex-1 justify-center items-center">
        Test
      </div>
      <div class="w-full flex justify-between items-center self-end">
        <LogoutButton />
        <FriendListDialog />
      </div>
    </main>
    <Footer />
  </div>
</template>
