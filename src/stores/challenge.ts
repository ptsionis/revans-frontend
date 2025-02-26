import type { ChallengeInterface } from '@/types/challenge'
import { useToast } from '@/components/ui/toast/use-toast'
import { socket } from '@/socket'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useUserStore } from './user'

export const useChallengeStore = defineStore('challenge', () => {
  const challenge = ref<ChallengeInterface>({
    id: '',
    challengerId: '',
    inviteeId: '',
  })
  const challengeOpened = ref<boolean>(false)
  const userStore = useUserStore()
  const { toast } = useToast()

  function setChallengeStore(data: ChallengeInterface) {
    challenge.value = data
  }

  function bindEvents() {
    socket.on('challenge:opened', () => {
      challengeOpened.value = true
      toast({
        description: 'A challenge has been opened.',
      })
    })
    socket.on('challenge:created', (data: ChallengeInterface) => {
      setChallengeStore(data)
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
    socket.on('disconnect', () => {
      $reset()
    })
  }

  function $reset() {
    challenge.value = {
      id: '',
      challengerId: '',
      inviteeId: '',
    }
    challengeOpened.value = false
  }

  return { challenge, challengeOpened, setChallengeStore, bindEvents, $reset }
})
