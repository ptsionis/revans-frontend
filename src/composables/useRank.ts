import { getRankIconString } from '@/utils/rank'
import { computed } from 'vue'

export function useRank(score: number) {
  const rank = computed(() => getRankIconString(score))

  return { rank }
}
