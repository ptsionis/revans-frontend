import type { ChallengeInterface } from '@/types/challenge'
import { useToast } from '@/components/ui/toast/use-toast'
import { socket } from '@/socket'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useUserStore } from './user'

const userStore = useUserStore()
const { toast } = useToast()
const defaultChallengeState: ChallengeInterface = {
  id: '',
  challengerId: '',
  inviteeId: '',
}

export const useChallengeStore = defineStore('challenge', () => {
  const challenge = ref<ChallengeInterface>({ ...defaultChallengeState })
  const challengeOpened = ref<boolean>(false)

  function bindEvents() {
    socket.on('challenge:opened', () => {
      challengeOpened.value = true
    })
    socket.on('challenge:created', (data: ChallengeInterface) => {
      challenge.value = data
      toast({
        description: data.challengerId === userStore.user.id ? 'Challenge has been sent.' : 'You have been challenged.',
      })
    })
    socket.on('challenge:error', () => {
      toast({
        variant: 'destructive',
        description: 'An error occurred while processing the challenge.',
      })
    })
    socket.on('challenge:cancelled', () => {
      $reset()
      toast({
        description: 'Challenge has been cancelled.',
      })
    })
    socket.on('game:init', () => {
      $reset()
    })
    socket.on('disconnect', () => {
      $reset()
    })
  }

  function $reset() {
    challenge.value = { ...defaultChallengeState }
    challengeOpened.value = false
  }

  return { challenge, challengeOpened, bindEvents }
})
