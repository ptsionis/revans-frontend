<script setup lang="ts">
import type { UserInterface } from '@/types/user'
import ProfileDialog from '@/components/Profile/ProfileDialog.vue'
import FriendRequestAcceptButton from './FriendRequestAcceptButton.vue'
import FriendRequestDeleteButton from './FriendRequestDeleteButton.vue'

defineProps<{
  profile: UserInterface
}>()
</script>

<template>
  <div class="flex justify-between items-center p-4 bg-background border border-muted">
    <ProfileDialog :profile="profile" :is-user-profile="false" />
    <div class="flex space-x-2">
      <FriendRequestAcceptButton :id="profile.id" />
      <FriendRequestDeleteButton :id="profile.id" />
    </div>
  </div>
</template>
