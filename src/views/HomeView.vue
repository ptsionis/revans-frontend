<script setup lang="ts">
import type { UserInterface } from '@/types/user'
import Footer from '@/components/Footer.vue'
import FriendshipsDialog from '@/components/Friendships/FriendshipsDialog.vue'
import LogoutButton from '@/components/LogoutButton.vue'
import PlayButton from '@/components/PlayButton.vue'
import ProfileDialog from '@/components/ProfileDialog.vue'
import { useSocket } from '@/composables/useSocket'
import { UserAvailability } from '@/enums/userAvailability'
import { useFriendshipsStore } from '@/stores/friendships'
import { useUserStore } from '@/stores/user'
import { onBeforeMount, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const { socket } = useSocket()
const userStore = useUserStore()
const friendshipsStore = useFriendshipsStore()
const onlineUsersCounter = ref(0)

onBeforeMount(() => {
  if (router.currentRoute.value.hash === '#_=_') {
    router.replace({ hash: '' })
  }
  socket.connect()
})

onMounted(() => {
  socket.emit('get_friends')
  socket.emit('get_friend_requests')

  socket.on('user_init', (data: UserInterface) => {
    userStore.setUserStore(data)
  })
  socket.on('set_friends', (data: UserInterface[]) => {
    friendshipsStore.setFriendshipsStore(data)
  })
  socket.on('set_friend_requests', (data: UserInterface[]) => {
    friendshipsStore.setFriendRequestsStore(data)
  })
  socket.on('online_users_counter', (data: number) => {
    onlineUsersCounter.value = data
  })
  socket.on('friend_connected', (data: string) => {
    friendshipsStore.setFriendOnline(data)
  })
  socket.on('friend_disconnected', (data: string) => {
    friendshipsStore.setFriendOffline(data)
  })
})
</script>

<template>
  <div class="min-h-dvh flex flex-col justify-center items-center">
    <main class="w-full flex flex-col flex-1 px-12 py-8">
      <div class="flex flex-col flex-1 justify-center items-center">
        <div class="flex flex-col items-center space-y-2">
          <PlayButton />
          <span class="font-extralight text-xs text-foreground/75">Currently online: {{ onlineUsersCounter }}</span>
        </div>
      </div>
      <div class="w-full flex justify-center items-center self-end space-x-8">
        <ProfileDialog :id="userStore.user.id" :availability="userStore.user.availability ?? UserAvailability.OFFLINE" :is-user-profile="true" :name="userStore.user.name" :picture-url="userStore.user.pictureUrl ?? ''" :score="userStore.user.score" :created-at="userStore.user.createdAt" />
        <FriendshipsDialog />
        <LogoutButton />
      </div>
    </main>
    <Footer />
  </div>
</template>
