<script setup lang="ts">
import AvailabilityBadge from '@/components/AvailabilityBadge.vue'
import RankIcon from '@/components/RankIcon.vue'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Button from '@/components/ui/button/Button.vue'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useToast } from '@/components/ui/toast/use-toast'
import { useUserStore } from '@/stores/user'
import { getRankName, getWinrate } from '@/utils/rank'
import { CalendarDaysIcon, CopyIcon, HashIcon, TrophyIcon, User2Icon } from 'lucide-vue-next'

const props = defineProps({
  isUserProfile: { type: Boolean, required: true },
  id: { type: String, required: true },
  name: { type: String, required: true },
  availability: { type: String, required: false },
  pictureUrl: String,
  score: { type: Number, required: true },
  gamesPlayed: { type: Number, required: true },
  gamesWon: { type: Number, required: true },
  createdAt: { type: String, required: true },
})
const userStore = useUserStore()
const { toast } = useToast()

function copyIdToClipboard() {
  navigator.clipboard.writeText(props.id)
  toast({
    description: 'Id copied to clipboard!',
  })
}
</script>

<template>
  <Dialog>
    <DialogTrigger>
      <div class="flex items-center space-x-3">
        <div class="relative">
          <Avatar class="relative" title="Profile Information">
            <AvatarImage :src="pictureUrl ?? ''" :alt="name" />
            <AvatarFallback>{{ name.slice(0, 1) }}</AvatarFallback>
          </Avatar>
          <AvailabilityBadge v-if="availability" :id="name" :availability="availability" />
        </div>
        <span v-if="!isUserProfile" class="max-w-[115px] font-light truncate">{{ name.split(' ')[0] }}</span>
        <div v-if="!isUserProfile" class="text-2xl">
          <RankIcon v-if="availability" :rank="score" />
        </div>
      </div>
    </DialogTrigger>
    <DialogContent class="py-12 h-[400px] items-start">
      <DialogHeader class="h-fit">
        <DialogTitle>Profile Information</DialogTitle>
        <DialogDescription>
          Find below profile information.
        </DialogDescription>
      </DialogHeader>
      <div class="flex flex-col justify-center items-start space-y-3">
        <div class="w-full flex justify-center items-center">
          <Avatar class="relative" size="base">
            <AvatarImage :src="pictureUrl ?? ''" :alt="name" />
            <AvatarFallback>{{ name.slice(0, 1) }}</AvatarFallback>
          </Avatar>
        </div>
        <div class="flex justify-center items-center text-2xl space-x-2">
          <User2Icon />
          <span class="font-light text-sm text-foreground/75">{{ name }}</span>
        </div>
        <div class="flex justify-center items-center text-2xl space-x-2">
          <CalendarDaysIcon />
          <span class="font-light text-sm text-foreground/75">Joined {{ new Date(createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }) }}</span>
        </div>
        <div class="flex justify-center items-center text-2xl space-x-2">
          <TrophyIcon />
          <span class="font-light text-sm text-foreground/75">{{ getRankName(score) }}</span>
          <span class="font-light text-sm text-foreground/75">({{ score }} points | {{ getWinrate(gamesPlayed, gamesWon) }}% winrate)</span>
          <RankIcon :rank="score" />
        </div>
        <div v-if="userStore.user.id === id" class="flex justify-center items-center text-2xl space-x-2">
          <HashIcon />
          <span class="font-light text-sm text-foreground/75">{{ id }}</span>
          <Button size="icon" title="Copy" @click="copyIdToClipboard">
            <CopyIcon class="cursor-pointer" />
          </Button>
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>
