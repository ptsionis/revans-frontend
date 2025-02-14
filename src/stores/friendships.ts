import type { UserAvailability } from '@/enums/userAvailability'
import type { UserInterface } from '@/types/user'
import { useToast } from '@/components/ui/toast/use-toast'
import { socket } from '@/socket'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFriendshipsStore = defineStore('friendships', () => {
  const friendships = ref<UserInterface[]>([])
  const friendRequests = ref<UserInterface[]>([])
  const { toast } = useToast()

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

  function bindEvents() {
    socket.on('set_friends', (data: UserInterface[]) => {
      setFriendshipsStore(data)
    })
    socket.on('friend_connected', ({ friendId, availability }: { friendId: string, availability: UserAvailability }) => {
      setFriendAvailability(friendId, availability)
    })
    socket.on('friend_disconnected', ({ friendId, availability }: { friendId: string, availability: UserAvailability }) => {
      setFriendAvailability(friendId, availability)
    })
    socket.on('set_friend_requests', (data: UserInterface[]) => {
      setFriendRequestsStore(data)
    })
    socket.on('friend_request_accepted', ({ friend, availability }: { friend: UserInterface, availability: UserAvailability }) => {
      addFriendship(friend)
      setFriendAvailability(friend.id, availability)
      removeFriendRequest(friend.id)
      toast({
        title: 'You have a new friend!',
        description: `You are now friends with ${friend.name}.`,
      })
    })
    socket.on('friend_request_deleted', (data: string) => {
      removeFriendRequest(data)
    })
    socket.on('disconnect', () => {
      $reset()
    })
  }

  function $reset() {
    friendships.value = []
    friendRequests.value = []
  }

  return { friendships, friendRequests, setFriendshipsStore, addFriendship, removeFriendship, setFriendAvailability, setFriendRequestsStore, addFriendRequest, removeFriendRequest, bindEvents, $reset }
})
