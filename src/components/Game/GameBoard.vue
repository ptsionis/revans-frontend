<script setup lang="ts">
import { useGameStore } from '@/stores/game'
import { useUserStore } from '@/stores/user'
import Separator from '../ui/separator/Separator.vue'
import GameBoardPlayer from './GameBoardPlayer.vue'

const userStore = useUserStore()
const gameStore = useGameStore()
</script>

<template>
  <div class="w-full sticky top-0 p-4 flex justify-between items-center bg-background border border-muted z-50">
    <GameBoardPlayer :name="userStore.user.name" :picture-url="userStore.user.pictureUrl ?? ''" :points="gameStore.game.userPoints" :is-user="true" />
    <Separator class="h-12" orientation="vertical" />
    <GameBoardPlayer :name="gameStore.game.opponent.name" :picture-url="gameStore.game.opponent.pictureUrl ?? ''" :points="gameStore.game.opponentPoints" :is-user="false" />
  </div>
</template>
