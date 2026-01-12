<template>
  <div class="flex w-full max-w-sm flex-col gap-6 p-10">
    <div class="absolute top-8 right-8 flex items-center gap-2">
      <span class="text-muted-foreground text-sm">Don't have an account?</span>
      <Button
        type="button"
        variant="link"
        class="text-primary hover:text-primary/80 cursor-pointer p-0 text-sm font-semibold focus:outline-none focus-visible:ring-0"
        @click="goToRegister"
        >Sign up</Button
      >
    </div>
    <p class="text-5xl font-bold">Sign in</p>
    <div class="space-y-5">
      <p class="text-muted-foreground text-sm">Sign in with Open Account</p>
      <div class="flex items-center justify-center gap-2">
        <Button type="button" variant="outline" class="flex-1 cursor-pointer" :disabled="true">
          <Icon name="google" />
          Google
        </Button>
        <Button type="button" variant="outline" class="flex-1 cursor-pointer" :disabled="true">
          <Icon name="facebook" />
          Facebook
        </Button>
      </div>
    </div>
    <div class="relative">
      <Separator />
      <p
        class="bg-background text-muted-foreground absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-2 text-center text-sm"
      >
        Or continue with
      </p>
    </div>
    <div class="space-y-5">
      <form class="flex flex-col gap-3" @submit.prevent="handleSignIn">
        <FormField name="email" v-slot="{ componentField }">
          <FormItem>
            <FormControl>
              <Input label="Email" placeholder="Email" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField name="password" v-slot="{ componentField }">
          <FormItem>
            <div class="relative">
              <FormControl>
                <Input
                  class="pr-8"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="Password"
                  v-bind="componentField"
                />
              </FormControl>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                class="absolute top-1/2 right-1 h-6 w-6 -translate-y-1/2 rounded-lg"
                @click="toggleShowPassword()"
              >
                <Eye v-if="showPassword" class="text-muted-foreground h-4 w-4" />
                <EyeOff v-else class="text-muted-foreground h-4 w-4" />
              </Button>
            </div>
            <FormMessage />
          </FormItem>
        </FormField>
        <Button class="h-12 cursor-pointer" type="submit" :disabled="isSubmitting">
          <Spinner v-if="isSubmitting" class="animate-spin" />
          <span>Sign in</span>
        </Button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'

import router from '@/router'
import Button from '@/components/ui/button/Button.vue'
import Separator from '@/components/ui/separator/Separator.vue'
import { Icon } from '@/components/ui/icon'
import Input from '@/components/ui/input/Input.vue'
import FormControl from '@/components/ui/form/FormControl.vue'
import FormItem from '@/components/ui/form/FormItem.vue'
import FormMessage from '@/components/ui/form/FormMessage.vue'
import { FormField } from '@/components/ui/form'
import { loginSchema } from '@/types/auth'
import { Eye, EyeOff } from 'lucide-vue-next'
import Spinner from '@/components/ui/spinner/Spinner.vue'
import { useToggle } from '@vueuse/core'

const isSubmitting = ref(false)
const [showPassword, toggleShowPassword] = useToggle(false)
const form = useForm({
  validationSchema: toTypedSchema(loginSchema),
  initialValues: {
    email: '',
    password: '',
  },
})

const goToRegister = () => {
  router.push({ name: 'Register' })
}

const handleSignIn = form.handleSubmit(async (values) => {
  if (isSubmitting.value) return

  isSubmitting.value = true

  // TODO: Handle login
  console.log('values', values)
})
</script>
