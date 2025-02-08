<script setup lang="ts">
import type { UserInterface } from '@/types/user'
import Footer from '@/components/Footer.vue'
import FriendshipsDialog from '@/components/Friendships/FriendshipsDialog.vue'
import LogoutButton from '@/components/LogoutButton.vue'
import { useSocket } from '@/composables/useSocket'
import { useFriendshipsStore } from '@/stores/friendships'
import { useUserStore } from '@/stores/user'
import { onBeforeMount, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const { socket } = useSocket()
const userStore = useUserStore()
const friendshipsStore = useFriendshipsStore()

onBeforeMount(() => {
  if (router.currentRoute.value.hash === '#_=_') {
    router.replace({ hash: '' })
  }
  socket.connect()
  socket.emit('get_friends')
})

onMounted(() => {
  socket.on('user_init', (data: UserInterface) => {
    userStore.setUserStore(data)
  })
  socket.on('set_friends', (data: UserInterface[]) => {
    friendshipsStore.setFriendshipsStore(data)
  })
})
</script>

<template>
  <div class="min-h-dvh flex flex-col justify-center items-center">
    <main class="w-full flex flex-col flex-1 px-12 py-8">
      <div class="flex flex-1 justify-center items-center">
        Revans
      </div>
      <div class="w-full flex justify-between items-center self-end">
        <LogoutButton />
        <FriendshipsDialog />
      </div>
    </main>
    <Footer />
  </div>
</template>
