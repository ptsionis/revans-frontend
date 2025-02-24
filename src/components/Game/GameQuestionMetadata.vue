<script setup lang="ts">
import Badge from '@/components/ui/badge/Badge.vue'
import { useGameStore } from '@/stores/game'

const gameStore = useGameStore()
</script>

<template>
  <div class="flex space-x-1">
    <Badge class="font-extralight" variant="secondary">
      {{ gameStore.game.currentQuestion?.category }}
    </Badge>
    <Badge class="font-extralight" variant="secondary">
      X{{ gameStore.game.currentQuestion?.level }}
    </Badge>
    <Badge v-if="gameStore.game.currentQuestion?.createdAt" class="font-extralight" variant="secondary">
      {{ new Date(gameStore.game.currentQuestion?.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
      }) }}
    </Badge>
  </div>
</template>
