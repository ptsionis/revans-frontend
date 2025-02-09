<script setup lang="ts">
import AvailabilityBadge from '@/components/AvailabilityBadge.vue'
import RankIcon from '@/components/RankIcon.vue'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useSocket } from '@/composables/useSocket'
import { getRankName } from '@/utils/rank'
import { Icon } from '@iconify/vue'
import { onMounted, ref, watch } from 'vue'

const props = defineProps({
  isUserProfile: { type: Boolean, required: true },
  id: { type: String, required: true },
  name: { type: String, required: true },
  pictureUrl: String,
  score: { type: Number, required: true },
  createdAt: { type: String, required: true },
})

const { socket } = useSocket()
const availability = ref<string>('')

onMounted(() => {
  if (!props.isUserProfile) {
    socket.emit('get_availability', props.id)
    socket.on('user_availability', (data: string) => {
      availability.value = data
    })
  }
})
</script>

<template>
  <Dialog>
    <DialogTrigger>
      <div class="flex items-center space-x-3">
        <div class="relative">
          <Avatar class="relative" title="Profile Information">
            <AvatarImage :src="pictureUrl ? pictureUrl : ''" :alt="name" />
            <AvatarFallback>{{ name.slice(0, 1) }}</AvatarFallback>
          </Avatar>
          <AvailabilityBadge v-if="!isUserProfile" :id="name" :availability="availability" />
        </div>
        <span v-if="!isUserProfile" class="font-light">{{ name }}</span>
        <div v-if="!isUserProfile" class="text-2xl">
          <RankIcon :rank="score" />
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
        <div class="flex justify-center items-center text-2xl space-x-2">
          <Icon icon="material-symbols:person" />
          <span class="font-light text-sm text-foreground/75">{{ name }}</span>
        </div>
        <div class="flex justify-center items-center text-2xl space-x-2">
          <Icon icon="material-symbols:calendar-month-outline-rounded" />
          <span class="font-light text-sm text-foreground/75">Joined {{ new Date(createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }) }}</span>
        </div>
        <div class="flex justify-center items-center text-2xl space-x-2">
          <Icon icon="game-icons:podium" />
          <span class="font-light text-sm text-foreground/75">{{ getRankName(score) }}</span>
          <RankIcon :rank="score" />
          <span class="font-light text-sm text-foreground/75">({{ score }} points)</span>
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>
