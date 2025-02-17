import type { ChallengeInterface } from '@/types/challenge'
import { socket } from '@/socket'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useChallengeStore = defineStore('challenge', () => {
  const challenge = ref<ChallengeInterface>({
    id: '',
    challengerId: '',
    inviteeId: '',
    isOpen: false,
  })

  function setChallengeStore(data: ChallengeInterface) {
    challenge.value = data
  }

  function bindEvents() {
    socket.on('challenge:created', (data: ChallengeInterface) => {
      setChallengeStore(data)
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
