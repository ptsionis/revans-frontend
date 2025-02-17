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

const userStore = useUserStore()
const challengeStore = useChallengeStore()
const amIChallenger = computed(() => challengeStore.challenge.challengerId === userStore.user.id)
</script>

<template>
  <Dialog :open="!!challengeStore.challenge.id">
    <DialogContent disable-close class="py-12 h-[400px]">
      <DialogHeader class="h-fit">
        <DialogTitle>You are in a challenge!</DialogTitle>
        <DialogDescription>
          {{ amIChallenger ? 'Wait for invitee\'s response or cancel the challenge.' : 'Accept or decline the challenge.' }}
        </DialogDescription>
      </DialogHeader>
      <ChallengeInfo v-if="challengeStore.challenge.inviteeId" />
    </DialogContent>
  </Dialog>
</template>
