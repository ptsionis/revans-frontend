<script setup lang="ts">
import type { UserInterface } from '@/types/user'
import Footer from '@/components/Footer.vue'
import FriendshipsDialog from '@/components/Friendships/FriendshipsDialog.vue'
import LogoutButton from '@/components/LogoutButton.vue'
import PlayButton from '@/components/PlayButton.vue'
import ProfileDialog from '@/components/ProfileDialog.vue'
import Toaster from '@/components/ui/toast/Toaster.vue'
import { useToast } from '@/components/ui/toast/use-toast'
import { useSocket } from '@/composables/useSocket'
import { UserAvailability } from '@/enums/userAvailability'
import { useFriendRequestsStore } from '@/stores/friendRequests'
import { useFriendshipsStore } from '@/stores/friendships'
import { useUserStore } from '@/stores/user'
import { onBeforeMount, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const { socket } = useSocket()
const { toast } = useToast()
const userStore = useUserStore()
const friendshipsStore = useFriendshipsStore()
const friendRequestsStore = useFriendRequestsStore()
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
    friendRequestsStore.setFriendRequestsStore(data)
  })
  socket.on('online_users_counter', (data: number) => {
    onlineUsersCounter.value = data
  })
  socket.on('friend_connected', ({ friendId, availability }: { friendId: string, availability: UserAvailability }) => {
    friendshipsStore.setFriendAvailability(friendId, availability)
  })
  socket.on('friend_disconnected', ({ friendId, availability }: { friendId: string, availability: UserAvailability }) => {
    friendshipsStore.setFriendAvailability(friendId, availability)
  })
  socket.on('friend_request_accepted', ({ friend, availability }: { friend: UserInterface, availability: UserAvailability }) => {
    friendshipsStore.addFriendship(friend)
    friendshipsStore.setFriendAvailability(friend.id, availability)
    friendRequestsStore.removeFriendRequest(friend.id)
    toast({
      title: 'You have a new friend!',
      description: `You are now friends with ${friend.name}.`,
    })
  })
  socket.on('friend_request_deleted', (data: string) => {
    friendRequestsStore.removeFriendRequest(data)
  })
})
</script>

<template>
  <div class="min-h-dvh flex flex-col justify-center items-center">
    <main class="w-full flex flex-col flex-1 px-12 py-8">
      <Toaster />
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
