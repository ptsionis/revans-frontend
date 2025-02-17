import { UserAvailability } from '@/enums/userAvailability'
import { useFriendshipsStore } from '@/stores/friendships'
import { computed } from 'vue'

export function useFriendship() {
  const friendshipsStore = useFriendshipsStore()

  const onlineFriendsCounter = computed(() => friendshipsStore.friendships.filter(friend => friend.availability !== UserAvailability.OFFLINE).length)
  const friendRequestsCounter = computed(() => friendshipsStore.friendRequests.length)

  return { onlineFriendsCounter, friendRequestsCounter }
}
