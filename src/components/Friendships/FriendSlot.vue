<script setup lang="ts">
import type { UserInterface } from '@/types/user'
import ChallengeButton from '@/components/Challenge/ChallengeButton.vue'
import ProfileDialog from '@/components/Profile/ProfileDialog.vue'
import { UserAvailability } from '@/enums/userAvailability'
import { useUserStore } from '@/stores/user'

defineProps<{
  profile: UserInterface
}>()

const userStore = useUserStore()
</script>

<template>
  <div class="flex justify-between items-center p-4 bg-background border border-muted">
    <ProfileDialog :profile="profile" :is-user-profile="false" />
    <div>
      <ChallengeButton v-if="profile.availability === UserAvailability.ONLINE && userStore.user.availability === UserAvailability.ONLINE" :id="profile.id" />
    </div>
  </div>
</template>
