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
    isOpen: false,
  })
  const userStore = useUserStore()
  const { toast } = useToast()

  function setChallengeStore(data: ChallengeInterface) {
    challenge.value = data
  }

  function bindEvents() {
    socket.on('challenge:created', (data: ChallengeInterface) => {
      setChallengeStore(data)
      toast({
        description: data.challengerId === userStore.user.id ? 'Challenge has been sent.' : 'You have been challenged.',
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
      isOpen: false,
    }
  }

  return { challenge, setChallengeStore, bindEvents, $reset }
})
