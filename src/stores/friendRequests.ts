import type { UserInterface } from '@/types/user'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFriendRequestsStore = defineStore('friendRequests', () => {
  const friendRequests = ref<UserInterface[]>([])

  function setFriendRequestsStore(data: UserInterface[]) {
    friendRequests.value = data
  }

  function addFriendRequest(friend: UserInterface) {
    friendRequests.value.push(friend)
  }

  function removeFriendRequest(id: string) {
    const index = friendRequests.value.findIndex(friend => friend.id === id)
    if (index !== -1) {
      friendRequests.value.splice(index, 1)
      friendRequests.value = [...friendRequests.value]
    }
  }

  function $reset() {
    friendRequests.value = []
  }

  return { friendRequests, setFriendRequestsStore, addFriendRequest, removeFriendRequest, $reset }
})
