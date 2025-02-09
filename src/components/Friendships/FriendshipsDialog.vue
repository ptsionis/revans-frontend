<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Icon } from '@iconify/vue'
import Button from '../ui/button/Button.vue'
import FriendRequestsList from './FriendRequestsList.vue'
import FriendshipsOnlineCounter from './FriendshipsOnlineCounter.vue'
import FriendsList from './FriendsList.vue'
</script>

<template>
  <Dialog>
    <DialogTrigger>
      <Button class="relative rounded-full px-3 py-5" title="See Friends">
        <Icon icon="material-symbols:person" />
        <FriendshipsOnlineCounter />
      </Button>
    </DialogTrigger>
    <DialogContent class="py-12 h-[400px]">
      <DialogHeader class="h-fit">
        <DialogTitle>Edit profile</DialogTitle>
        <DialogDescription>
          Challenge your friends and respond to incoming challenges. You can also see who is online and manage your friend requests.
        </DialogDescription>
      </DialogHeader>
      <Tabs default-value="account" class="w-full h-[200px]">
        <TabsList class="w-full flex justify-around">
          <TabsTrigger class="w-full" value="friends">
            Friends
          </TabsTrigger>
          <TabsTrigger class="w-full" value="requests">
            Requests
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
