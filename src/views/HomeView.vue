<script setup lang="ts">
import ChallengeDialog from '@/components/Challenge/ChallengeDialog.vue'
import Footer from '@/components/Footer.vue'
import FriendshipsDialog from '@/components/Friendships/FriendshipsDialog.vue'
import Game from '@/components/Game/Game.vue'
import Logo from '@/components/Logo.vue'
import LogoutButton from '@/components/LogoutButton.vue'
import PlayButton from '@/components/PlayButton.vue'
import ProfileDialog from '@/components/Profile/ProfileDialog.vue'
import Toaster from '@/components/ui/toast/Toaster.vue'
import { socket } from '@/socket'
import { useChallengeStore } from '@/stores/challenge'
import { useConnectionStore } from '@/stores/connection'
import { useFriendshipsStore } from '@/stores/friendships'
import { useGameStore } from '@/stores/game'
import { useUserStore } from '@/stores/user'
import { onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const connectionStore = useConnectionStore()
const userStore = useUserStore()
const friendshipsStore = useFriendshipsStore()
const challengeStore = useChallengeStore()
const gameStore = useGameStore()

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
challengeStore.bindEvents()
gameStore.bindEvents()
</script>

<template>
  <div class="min-h-dvh flex flex-col justify-center items-center">
    <main v-if="!gameStore.game.id" class="w-full flex flex-col flex-1 px-12 py-8">
      <div class="flex flex-col flex-1 justify-center items-center">
        <div class="flex flex-col items-center space-y-8">
          <Logo />
          <div class="flex flex-col items-center space-y-2">
            <PlayButton />
            <span class="font-extralight text-xs text-foreground/75">Currently online: {{ userStore.onlineUsersCounter === 1 ? 'You' : userStore.onlineUsersCounter }}</span>
          </div>
        </div>
      </div>
      <div class="w-full flex justify-center items-center self-end space-x-8">
        <ProfileDialog :profile="userStore.user" :is-user-profile="true" />
        <FriendshipsDialog />
        <LogoutButton />
      </div>
      <Toaster />
      <ChallengeDialog />
    </main>
    <main v-else class="w-full flex flex-col flex-1 px-12 py-8">
      <Game />
    </main>
    <Footer />
  </div>
</template>
