<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useChallengeStore } from '@/stores/challenge'
import { useUserStore } from '@/stores/user'
import { computed } from 'vue'
import ChallengeInfo from './ChallengeInfo.vue'
import ChallengeInfoOpen from './ChallengeInfoOpen.vue'

const userStore = useUserStore()
const challengeStore = useChallengeStore()
const amIChallenger = computed(() => challengeStore.challenge.challengerId === userStore.user.id)
</script>

<template>
  <Dialog :open="!!challengeStore.challenge.id || !!challengeStore.challengeOpened">
    <DialogContent disable-close class="py-12 h-[400px]">
      <DialogHeader class="h-fit">
        <DialogTitle>You are in a challenge!</DialogTitle>
        <DialogDescription>
          {{ challengeStore.challenge.id ? amIChallenger ? 'Wait for invitee\'s response or cancel the challenge.' : 'Accept or decline the challenge.' : 'Wait for an opponent to play.' }}
        </DialogDescription>
      </DialogHeader>
      <ChallengeInfo v-if="challengeStore.challenge.id" />
      <ChallengeInfoOpen v-else />
    </DialogContent>
  </Dialog>
</template>
