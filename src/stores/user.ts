import type { UserInterface } from '@/types/user'
import { UserAvailability } from '@/enums/userAvailability'
import { UserRole } from '@/enums/userRole'
import { socket } from '@/socket'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const user = ref<UserInterface>({
    id: '',
    name: '',
    role: UserRole.USER,
    score: 0,
    gamesPlayed: 0,
    gamesWon: 0,
    pictureUrl: '',
    createdAt: '',
    availability: UserAvailability.OFFLINE,
  })
  const onlineUsersCounter = ref<number>(0)

  function setUserStore(data: UserInterface) {
    user.value = data
  }

  function bindEvents() {
    socket.on('user:init', (data: UserInterface) => {
      setUserStore(data)
    })
    socket.on('user:availability', (availability: UserAvailability) => {
      user.value.availability = availability
    })
    socket.on('user:online_counter', (data: number) => {
      onlineUsersCounter.value = data
    })
    socket.on('disconnect', () => {
      $reset()
    })
  }

  function $reset() {
    user.value = {
      id: '',
      name: '',
      role: UserRole.USER,
      score: 0,
      gamesPlayed: 0,
      gamesWon: 0,
      pictureUrl: '',
      createdAt: '',
      availability: UserAvailability.OFFLINE,
    }
    onlineUsersCounter.value = 0
  }

  return { user, onlineUsersCounter, setUserStore, bindEvents, $reset }
})
