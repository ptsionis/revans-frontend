<script setup lang="ts">
import FriendAddSection from '@/components/Friendships/FriendAddSection.vue'
import FriendRequestsList from '@/components/Friendships/FriendRequestsList.vue'
import FriendshipsBadgeCounter from '@/components/Friendships/FriendshipsBadgeCounter.vue'
import FriendsList from '@/components/Friendships/FriendsList.vue'
import Button from '@/components/ui/button/Button.vue'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useFriendship } from '@/composables/useFriendship'
import { UserRoundIcon } from 'lucide-vue-next'

const { onlineFriendsCounter, friendRequestsCounter } = useFriendship()
</script>

<template>
  <Dialog>
    <DialogTrigger>
      <Button class="relative rounded-full px-3 py-5" title="See Friends">
        <UserRoundIcon />
        <FriendshipsBadgeCounter />
      </Button>
    </DialogTrigger>
    <DialogContent class="py-12 h-[400px]">
      <DialogHeader class="h-fit">
        <DialogTitle>Friends & Requests</DialogTitle>
        <DialogDescription>
          Challenge friends, manage friend requests or add new.
        </DialogDescription>
      </DialogHeader>
      <Tabs default-value="account" class="w-full h-[200px]">
        <TabsList class="w-full flex justify-around">
          <TabsTrigger class="w-full" value="friends">
            Online ({{ onlineFriendsCounter }})
          </TabsTrigger>
          <TabsTrigger class="w-full" value="requests">
            Requests ({{ friendRequestsCounter }})
          </TabsTrigger>
          <TabsTrigger class="w-full" value="add-friends">
            Add Friend
          </TabsTrigger>
        </TabsList>
        <TabsContent value="friends">
          <FriendsList />
        </TabsContent>
        <TabsContent value="requests">
          <FriendRequestsList />
        </TabsContent>
        <TabsContent value="add-friends">
          <FriendAddSection />
        </TabsContent>
      </Tabs>
    </DialogContent>
  </Dialog>
</template>
