import type { UserInterface } from '@/types/user'
import { UserAvailability } from '@/enums/userAvailability'
import { UserRole } from '@/enums/userRole'
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

  function setUserStore(data: UserInterface) {
    user.value = data
  }

  function resetUserStore() {
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
  }

  return { user, setUserStore, resetUserStore }
})
