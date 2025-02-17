<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue'
import {
  FormControl,
  FormField,
  FormItem,
} from '@/components/ui/form'
import Input from '@/components/ui/input/Input.vue'
import { socket } from '@/socket'
import { useUserStore } from '@/stores/user'
import { toTypedSchema } from '@vee-validate/zod'
import { SearchIcon, UserPlus2Icon } from 'lucide-vue-next'
import { useForm } from 'vee-validate'
import { computed } from 'vue'
import * as z from 'zod'
import FormDescription from '../ui/form/FormDescription.vue'

const userStore = useUserStore()
const idLength = computed(() => userStore.user.id.length)
const formSchema = toTypedSchema(z.object({
  userId: z.string().min(idLength.value).max(idLength.value),
}))

const { handleSubmit, resetForm } = useForm({
  validationSchema: formSchema,
})

const onSubmit = handleSubmit((values) => {
  socket.emit('friendship:send_friend_request', values.userId)
  resetForm()
})
</script>

<template>
  <form class="w-full flex justify-center items-start space-x-2 pt-6" @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="userId">
      <FormItem class="relative w-full">
        <FormControl class="relative w-full items-center">
          <Input autocomplete="off" class="pl-10" type="text" placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" v-bind="componentField" />
          <SearchIcon class="absolute top-0 left-2 size-6 text-muted-foreground" />
        </FormControl>
        <FormDescription class="text-xs font-extralight">
          Enter the user id to send a friend request.
        </FormDescription>
      </FormItem>
    </FormField>
    <Button size="icon" type="submit">
      <UserPlus2Icon />
    </Button>
  </form>
</template>
