<script setup lang="ts">
import Footer from '@/components/Footer.vue'
import FriendshipsDialog from '@/components/Friendships/FriendshipsDialog.vue'
import LogoutButton from '@/components/LogoutButton.vue'
import PlayButton from '@/components/PlayButton.vue'
import ProfileDialog from '@/components/ProfileDialog.vue'
import Toaster from '@/components/ui/toast/Toaster.vue'
import { UserAvailability } from '@/enums/userAvailability'
import { socket } from '@/socket'
import { useConnectionStore } from '@/stores/connection'
import { useFriendshipsStore } from '@/stores/friendships'
import { useUserStore } from '@/stores/user'
import { onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const connectionStore = useConnectionStore()
const userStore = useUserStore()
const friendshipsStore = useFriendshipsStore()

onBeforeMount(() => {
  if (router.currentRoute.value.hash === '#_=_') {
    router.replace({ hash: '' })
  }
})

socket.off()
connectionStore.connect()
connectionStore.bindEvents()
userStore.bindEvents()
friendshipsStore.bindEvents()
</script>

<template>
  <div class="min-h-dvh flex flex-col justify-center items-center">
    <main class="w-full flex flex-col flex-1 px-12 py-8">
      <Toaster />
      <div class="flex flex-col flex-1 justify-center items-center">
        <div class="flex flex-col items-center space-y-2">
          <PlayButton />
          <span class="font-extralight text-xs text-foreground/75">Currently online: {{ userStore.onlineUsersCounter }}</span>
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
