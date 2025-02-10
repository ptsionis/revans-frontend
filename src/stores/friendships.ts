import type { UserInterface } from '@/types/user'
import { UserAvailability } from '@/enums/userAvailability'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFriendshipsStore = defineStore('friendships', () => {
  const friendships = ref<UserInterface[]>([])
  const friendRequests = ref<UserInterface[]>([])

  function setFriendshipsStore(data: UserInterface[]) {
    friendships.value = data
  }

  function setFriendRequestsStore(data: UserInterface[]) {
    friendRequests.value = data
  }

  function resetFriendshipsStore() {
    friendships.value = []
  }

  function resetFriendRequestsStore() {
    friendRequests.value = []
  }

  function setFriendOnline(id: string) {
    const friend = friendships.value.find(friend => friend.id === id)
    if (friend) {
      friend.availability = UserAvailability.ONLINE
    }
  }

  function setFriendOffline(id: string) {
    const friend = friendships.value.find(friend => friend.id === id)
    if (friend) {
      friend.availability = UserAvailability.OFFLINE
    }
  }

  return { friendships, friendRequests, setFriendshipsStore, setFriendRequestsStore, resetFriendshipsStore, resetFriendRequestsStore, setFriendOnline, setFriendOffline }
})
