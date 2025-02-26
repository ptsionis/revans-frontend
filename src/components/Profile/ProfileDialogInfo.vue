<script setup lang="ts">
import RankIcon from '@/components/RankIcon.vue'
import Button from '@/components/ui/button/Button.vue'
import ScrollArea from '@/components/ui/scroll-area/ScrollArea.vue'
import { useToast } from '@/components/ui/toast/use-toast'
import { useUserStore } from '@/stores/user'
import { getRankName, getWinrate } from '@/utils/rank'
import { CalendarDaysIcon, CopyIcon, HashIcon, TrophyIcon, User2Icon } from 'lucide-vue-next'

const props = defineProps<{
  id: string
  name: string
  pictureUrl: string
  score: number
  gamesPlayed: number
  gamesWon: number
  createdAt: string
}>()

const userStore = useUserStore()
const { toast } = useToast()
const sectionWrapperClass = 'flex justify-start items-center text-2xl space-x-2 p-4 bg-background border border-muted'
const sectionTextClass = 'font-light text-sm text-foreground/75'

function copyIdToClipboard() {
  navigator.clipboard.writeText(props.id)
  toast({
    description: 'Id copied to clipboard!',
  })
}
</script>

<template>
  <ScrollArea class="w-full h-[170px] py-4">
    <div :class="sectionWrapperClass">
      <User2Icon />
      <span :class="sectionTextClass">{{ name }}</span>
    </div>
    <div :class="sectionWrapperClass">
      <CalendarDaysIcon />
      <span :class="sectionTextClass">Joined {{ new Date(createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }) }}</span>
    </div>
    <div :class="sectionWrapperClass">
      <TrophyIcon />
      <span :class="sectionTextClass">{{ getRankName(score) }}</span>
      <RankIcon :rank="score" />
      <span :class="sectionTextClass">[ {{ score }} GP | {{ getWinrate(gamesPlayed, gamesWon) }}% WR ]</span>
    </div>
    <div v-if="userStore.user.id === id" :class="sectionWrapperClass">
      <HashIcon />
      <span :class="sectionTextClass">{{ id }}</span>
      <Button size="icon" title="Copy" @click="copyIdToClipboard">
        <CopyIcon class="cursor-pointer" />
      </Button>
    </div>
  </ScrollArea>
</template>
