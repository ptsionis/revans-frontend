import type { UserInterface } from '@/types/user'
import { UserRole } from '@/enums/userRole'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const user = ref<UserInterface>({
    id: '',
    name: '',
    role: UserRole.USER,
    score: 0,
    pictureUrl: '',
    createdAt: new Date(),
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
      pictureUrl: '',
      createdAt: new Date(),
    }
  }

  return { user, setUserStore, resetUserStore }
})
