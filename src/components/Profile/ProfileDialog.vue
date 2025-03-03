<script setup lang="ts">
import type { UserInterface } from '@/types/user'
import AvailabilityBadge from '@/components/AvailabilityBadge.vue'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ProfileDialogInfo from './ProfileDialogInfo.vue'
import ProfileDialogStats from './ProfileDialogStats.vue'

defineProps<{
  isUserProfile: boolean
  profile: UserInterface
}>()
</script>

<template>
  <Dialog>
    <DialogTrigger>
      <div class="flex items-center space-x-3">
        <div class="relative">
          <Avatar class="relative" title="Profile Information">
            <AvatarImage :src="profile.pictureUrl ?? ''" :alt="profile.name" />
            <AvatarFallback>{{ profile.name.slice(0, 1) }}</AvatarFallback>
          </Avatar>
          <AvailabilityBadge v-if="profile.availability" :id="profile.name" :availability="profile.availability" />
        </div>
        <span v-if="!isUserProfile" class="max-w-[115px] font-light truncate">{{ profile.name.split(' ')[0] }}</span>
      </div>
    </DialogTrigger>
    <DialogContent class="py-12 h-[400px] items-start">
      <DialogHeader class="h-fit">
        <DialogTitle>Profile Information</DialogTitle>
        <DialogDescription>
          Find below profile information.
        </DialogDescription>
      </DialogHeader>
      <div class="w-full flex justify-center items-center">
        <Avatar class="relative" size="sm">
          <AvatarImage :src="profile.pictureUrl ?? ''" :alt="profile.name" />
          <AvatarFallback>{{ profile.name.slice(0, 1) }}</AvatarFallback>
        </Avatar>
      </div>
      <Tabs default-value="account" class="w-full h-[200px]">
        <TabsList class="w-full flex justify-around">
          <TabsTrigger class="w-full" value="info">
            Info
          </TabsTrigger>
          <TabsTrigger class="w-full" value="stats">
            Stats
          </TabsTrigger>
        </TabsList>
        <TabsContent value="info">
          <ProfileDialogInfo :id="profile.id" :name="profile.name" :picture-url="profile.pictureUrl ?? ''" :score="profile.score" :games-played="profile.gamesPlayed" :games-won="profile.gamesWon" :created-at="profile.createdAt" />
        </TabsContent>
        <TabsContent value="stats">
          <ProfileDialogStats
            :profile="profile"
          />
        </TabsContent>
      </Tabs>
    </DialogContent>
  </Dialog>
</template>
