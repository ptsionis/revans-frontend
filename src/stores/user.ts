import type { UserInterface } from '@/types/user'
import { UserRole } from '@/enums/userRole'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const id = ref<string>('')
  const name = ref<string>('')
  const role = ref<UserRole>(UserRole.USER)
  const score = ref<number>(0)
  const pictureUrl = ref<string>('')
  const createdAt = ref<Date>(new Date())

  function setUserStore(user: UserInterface) {
    id.value = user.id
    name.value = user.name
    role.value = user.role
    score.value = user.score
    pictureUrl.value = user.pictureUrl || ''
    createdAt.value = user.createdAt
  }

  function resetUserStore() {
    id.value = ''
    name.value = ''
    role.value = UserRole.USER
    score.value = 0
    pictureUrl.value = ''
    createdAt.value = new Date()
  }

  return { id, name, role, score, pictureUrl, createdAt, setUserStore, resetUserStore }
})
