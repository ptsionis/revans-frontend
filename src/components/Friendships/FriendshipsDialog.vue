<script setup lang="ts">
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
import { Icon } from '@iconify/vue'

const { onlineFriendsCounter, friendRequestsCounter } = useFriendship()
</script>

<template>
  <Dialog>
    <DialogTrigger>
      <Button class="relative rounded-full px-3 py-5" title="See Friends">
        <Icon icon="material-symbols:person" />
        <FriendshipsBadgeCounter />
      </Button>
    </DialogTrigger>
    <DialogContent class="py-12 h-[400px]">
      <DialogHeader class="h-fit">
        <DialogTitle>Friends & Requests</DialogTitle>
        <DialogDescription>
          Challenge your friends, respond to challenges, manage your friend requests.
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
        </TabsList>
        <TabsContent value="friends">
          <FriendsList />
        </TabsContent>
        <TabsContent value="requests">
          <FriendRequestsList />
        </TabsContent>
      </Tabs>
    </DialogContent>
  </Dialog>
</template>
