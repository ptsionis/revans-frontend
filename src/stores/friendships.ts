import type { UserAvailability } from '@/enums/userAvailability'
import type { UserInterface } from '@/types/user'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFriendshipsStore = defineStore('friendships', () => {
  const friendships = ref<UserInterface[]>([])

  function setFriendshipsStore(data: UserInterface[]) {
    friendships.value = data
  }

  function addFriendship(friend: UserInterface) {
    friendships.value.push(friend)
  }

  function removeFriendship(id: string) {
    const index = friendships.value.findIndex(friend => friend.id === id)
    if (index !== -1) {
      friendships.value.splice(index, 1)
    }
  }

  function setFriendAvailability(id: string, availability: UserAvailability) {
    const friend = friendships.value.find(friend => friend.id === id)
    if (friend) {
      friend.availability = availability
    }
  }

  function $reset() {
    friendships.value = []
  }

  return { friendships, setFriendshipsStore, addFriendship, removeFriendship, setFriendAvailability, $reset }
})
