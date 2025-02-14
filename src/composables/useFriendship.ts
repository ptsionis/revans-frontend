import { UserAvailability } from '@/enums/userAvailability'
import { useFriendRequestsStore } from '@/stores/friendRequests'
import { useFriendshipsStore } from '@/stores/friendships'
import { computed } from 'vue'

export function useFriendship() {
  const friendshipsStore = useFriendshipsStore()
  const friendRequestsStore = useFriendRequestsStore()

  const onlineFriendsCounter = computed(() => friendshipsStore.friendships.filter(friend => friend.availability === UserAvailability.ONLINE).length)
  const friendRequestsCounter = computed(() => friendRequestsStore.friendRequests.length)

  return { onlineFriendsCounter, friendRequestsCounter }
}
