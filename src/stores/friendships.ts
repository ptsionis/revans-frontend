import type { UserAvailability } from '@/enums/userAvailability'
import type { UserInterface } from '@/types/user'
import { useToast } from '@/components/ui/toast/use-toast'
import { availabilityOrder } from '@/enums/userAvailability'
import { socket } from '@/socket'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const { toast } = useToast()

export const useFriendshipsStore = defineStore('friendships', () => {
  const friendships = ref<UserInterface[]>([])
  const friendRequests = ref<UserInterface[]>([])

  function getFriendship(id: string) {
    return friendships.value.find(friend => friend.id === id)
  }

  function updateFriendship(friend: UserInterface) {
    const index = friendships.value.findIndex(f => f.id === friend.id)
    if (index !== -1) {
      friendships.value[index] = friend
    }
  }

  function addFriendship(friend: UserInterface) {
    friendships.value.push(friend)
    sortFriendships()
  }

  // function removeFriendship(id: string) {
  //   const index = friendships.value.findIndex(friend => friend.id === id)
  //   if (index !== -1) {
  //     friendships.value.splice(index, 1)
  //   }
  // }

  function setFriendAvailability(id: string, availability: UserAvailability) {
    const friend = friendships.value.find(friend => friend.id === id)
    if (friend) {
      friend.availability = availability
    }
    sortFriendships()
  }

  function sortFriendships() {
    friendships.value.sort((a, b) => {
      const orderA = availabilityOrder[a.availability ?? 'OFFLINE']
      const orderB = availabilityOrder[b.availability ?? 'OFFLINE']
      if (orderA !== orderB) {
        return orderA - orderB
      }
      return a.name.localeCompare(b.name)
    })
  }

  function addFriendRequest(friend: UserInterface) {
    friendRequests.value.push(friend)
    sortFriendRequests()
  }

  function removeFriendRequest(id: string) {
    const index = friendRequests.value.findIndex(friend => friend.id === id)
    if (index !== -1) {
      friendRequests.value.splice(index, 1)
      friendRequests.value = [...friendRequests.value]
    }
  }

  function sortFriendRequests() {
    friendRequests.value.sort((a, b) => {
      return a.name.localeCompare(b.name)
    })
  }

  function bindEvents() {
    socket.on('user:set_friends', (data: UserInterface[]) => {
      friendships.value = data
      sortFriendships()
    })
    socket.on('user:set_friend_requests', (data: UserInterface[]) => {
      friendRequests.value = data
      sortFriendRequests()
    })
    socket.on('friend:availability', ({ friendId, availability }: { friendId: string, availability: UserAvailability }) => {
      setFriendAvailability(friendId, availability)
    })
    socket.on('friend:update_friend', (data: UserInterface) => {
      updateFriendship(data)
    })
    socket.on('friendship:friend_request_sent', () => {
      toast({
        title: 'Friend request sent!',
        description: 'Your friend request has been sent.',
      })
    })
    socket.on('friendship:friend_request_received', (data: UserInterface) => {
      addFriendRequest(data)
      toast({
        title: 'New friend request!',
        description: `${data.name} wants to be your friend.`,
      })
    })
    socket.on('friendship:friend_request_failed', () => {
      toast({
        variant: 'destructive',
        title: 'Friend request failed!',
        description: 'There was an issue sending your friend request.',
      })
    })
    socket.on('friendship:friend_request_accepted', ({ friend, availability }: { friend: UserInterface, availability: UserAvailability }) => {
      addFriendship(friend)
      setFriendAvailability(friend.id, availability)
      removeFriendRequest(friend.id)
      toast({
        title: 'You have a new friend!',
        description: `You are now friends with ${friend.name}.`,
      })
    })
    socket.on('friendship:friend_request_deleted', (data: string) => {
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

  return { friendships, friendRequests, getFriendship, bindEvents }
})
