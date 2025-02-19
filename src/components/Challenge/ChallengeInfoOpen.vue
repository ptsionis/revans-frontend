<script setup lang="ts">
import ChallengeCancelButton from '@/components/Challenge/ChallengeCancelButton.vue'
import ChallengeInfoSlot from '@/components/Challenge/ChallengeInfoSlot.vue'
import { useUserStore } from '@/stores/user'
import { Loader2Icon } from 'lucide-vue-next'

const userStore = useUserStore()
</script>

<template>
  <div class="flex flex-col justify-center items-center space-y-4">
    <ChallengeInfoSlot :name="userStore.user.name" :picture-url="userStore.user.pictureUrl ?? undefined" />
    <div class="flex justify-center items-center space-x-2 text-muted-foreground text-sm">
      <span>Waiting for an opponent...</span>
      <Loader2Icon class="animate-spin" />
    </div>
    <ChallengeCancelButton />
  </div>
</template>
