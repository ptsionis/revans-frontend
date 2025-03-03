import type { UserInterface } from '@/types/user'
import { UserAvailability } from '@/enums/userAvailability'
import { UserRole } from '@/enums/userRole'
import { socket } from '@/socket'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const defaultUserState: UserInterface = {
  id: '',
  role: UserRole.USER,
  name: '',
  pictureUrl: '',
  score: 0,
  gamesPlayed: 0,
  gamesWon: 0,
  historyPlayed: 0,
  historyWon: 0,
  geographyPlayed: 0,
  geographyWon: 0,
  financePlayed: 0,
  financeWon: 0,
  logoPlayed: 0,
  logoWon: 0,
  triviaPlayed: 0,
  triviaWon: 0,
  secretPlayed: 0,
  secretWon: 0,
  createdAt: '',
  availability: UserAvailability.OFFLINE,
}

export const useUserStore = defineStore('user', () => {
  const user = ref<UserInterface>({ ...defaultUserState })
  const onlineUsersCounter = ref<number>(0)

  function bindEvents() {
    socket.on('user:set', (data: UserInterface) => {
      user.value = data
    })
    socket.on('user:availability', (availability: UserAvailability) => {
      user.value.availability = availability
    })
    socket.on('user:score', (score: number) => {
      user.value.score = score
    })
    socket.on('user:online_counter', (data: number) => {
      onlineUsersCounter.value = data
    })
    socket.on('disconnect', () => {
      $reset()
    })
  }

  function $reset() {
    user.value = { ...defaultUserState }
    onlineUsersCounter.value = 0
  }

  return { user, onlineUsersCounter, bindEvents }
})
