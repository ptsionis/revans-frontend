import type { UserInterface } from '@/types/user'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFriendshipsStore = defineStore('friendships', () => {
  const friendships = ref<UserInterface[]>([])

  function setFriendshipsStore(data: UserInterface[]) {
    friendships.value = data
  }

  function resetFriendshipsStore() {
    friendships.value = []
  }

  return { friendships, setFriendshipsStore, resetFriendshipsStore }
})
