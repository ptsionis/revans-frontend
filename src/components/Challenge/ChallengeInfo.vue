<script setup lang="ts">
import type { UserInterface } from '@/types/user'
import { useChallengeStore } from '@/stores/challenge'
import { useFriendshipsStore } from '@/stores/friendships'
import { useUserStore } from '@/stores/user'
import { Loader2Icon } from 'lucide-vue-next'
import { computed } from 'vue'
import ChallengeAcceptButton from './ChallengeAcceptButton.vue'
import ChallengeCancelButton from './ChallengeCancelButton.vue'
import ChallengeInfoSlot from './ChallengeInfoSlot.vue'

const userStore = useUserStore()
const friendshipsStore = useFriendshipsStore()
const challengeStore = useChallengeStore()
const amIChallenger = computed(() => challengeStore.challenge.challengerId === userStore.user.id)
const opponent = computed<UserInterface>(() => {
  if (amIChallenger.value) {
    return friendshipsStore.getFriendship(challengeStore.challenge.inviteeId) as UserInterface
  }
  return friendshipsStore.getFriendship(challengeStore.challenge.challengerId) as UserInterface
})
</script>

<template>
  <div class="flex justify-center items-center space-x-4">
    <ChallengeInfoSlot :name="userStore.user.name" :picture-url="userStore.user.pictureUrl ?? undefined" />
    <span>vs</span>
    <ChallengeInfoSlot :name="opponent?.name" :picture-url="opponent.pictureUrl ?? undefined" />
  </div>
  <div v-if="amIChallenger" class="flex flex-col justify-center items-center space-y-6">
    <div class="flex justify-center items-center space-x-2 text-muted-foreground text-sm">
      <span>Waiting for invitee's response...</span>
      <Loader2Icon class="animate-spin" />
    </div>
    <ChallengeCancelButton />
  </div>
  <div v-else class="flex justify-center items-center space-x-12">
    <ChallengeAcceptButton />
    <ChallengeCancelButton />
  </div>
</template>
