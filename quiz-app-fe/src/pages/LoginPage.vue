<template>
  <div class="flex w-full max-w-lg flex-col gap-10">
    <!-- Logo for mobile -->
    <div class="animate-scale-in flex items-center justify-center lg:hidden">
      <div
        class="bg-primary text-primary-foreground flex h-16 w-16 items-center justify-center rounded-xl"
      >
        <LogIn class="h-8 w-8" />
      </div>
    </div>

    <!-- Title Section -->
    <div class="animate-fade-in-down text-center lg:text-left">
      <h1 class="text-foreground text-4xl font-bold">Welcome back</h1>
      <p class="text-muted-foreground mt-3">Sign in to continue your learning journey</p>
    </div>

    <!-- Login Form -->
    <form class="animate-fade-in-up delay-100 space-y-6" @submit="onSubmit">
      <!-- Email Field -->
      <FormField v-slot="{ componentField }" name="email">
        <FormItem class="space-y-2">
          <FormLabel class="text-foreground font-medium">Email</FormLabel>
          <FormControl>
            <Input
              v-bind="componentField"
              type="email"
              placeholder="name@example.com"
              class="border-input bg-background focus:border-primary focus:ring-primary/20 h-14 rounded-xl text-base transition-all focus:ring-2"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <!-- Password Field -->
      <FormField v-slot="{ componentField }" name="password">
        <FormItem class="space-y-2">
          <FormLabel class="text-foreground font-medium">Password</FormLabel>
          <FormControl>
            <div class="relative">
              <Input
                v-bind="componentField"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Enter your password"
                class="border-input bg-background focus:border-primary focus:ring-primary/20 h-14 rounded-xl pr-14 text-base transition-all focus:ring-2"
              />
              <button
                type="button"
                class="text-muted-foreground hover:text-foreground absolute top-1/2 right-4 -translate-y-1/2 p-1 transition-colors"
                @click="showPassword = !showPassword"
              >
                <Eye v-if="showPassword" class="h-5 w-5" />
                <EyeOff v-else class="h-5 w-5" />
              </button>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <!-- Remember me & Forgot password -->
      <div class="flex items-center justify-between">
        <Checkbox v-model:checked="rememberMe" class="cursor-pointer">
          <span class="text-muted-foreground select-none">Remember me</span>
        </Checkbox>
        <Button
          type="button"
          variant="link"
          class="text-primary hover:text-primary/80 h-auto p-0 font-medium"
          @click="goToForgotPassword"
        >
          Forgot password?
        </Button>
      </div>

      <!-- Submit Button -->
      <Button
        type="submit"
        :disabled="isSubmitting"
        class="bg-primary text-primary-foreground hover:bg-primary/90 h-14 w-full cursor-pointer rounded-xl text-base font-semibold transition-all duration-200"
      >
        <Spinner v-if="isSubmitting" class="mr-2 h-5 w-5 animate-spin" />
        <span>{{ isSubmitting ? 'Signing in...' : 'Sign in' }}</span>
      </Button>
    </form>

    <!-- Divider -->
    <div class="animate-fade-in-up delay-200 relative">
      <div class="absolute inset-0 flex items-center">
        <div class="border-border w-full border-t"></div>
      </div>
      <div class="relative flex justify-center">
        <span class="bg-background text-muted-foreground px-4">Or continue with</span>
      </div>
    </div>

    <!-- Social Login - Vertical -->
    <div class="animate-fade-in-up delay-300 space-y-4">
      <Button
        type="button"
        variant="outline"
        class="border-border hover:bg-accent h-14 w-full cursor-pointer gap-3 rounded-xl text-base font-medium transition-all"
      >
        <Icon name="google" class="h-5 w-5" />
        Continue with Google
      </Button>
      <Button
        type="button"
        variant="outline"
        class="border-border hover:bg-accent h-14 w-full cursor-pointer gap-3 rounded-xl text-base font-medium transition-all"
      >
        <Icon name="facebook" class="h-5 w-5" />
        Continue with Facebook
      </Button>
    </div>

    <!-- Sign up link -->
    <p class="animate-fade-in-up delay-400 text-muted-foreground text-center">
      Don't have an account?
      <Button
        type="button"
        variant="link"
        class="text-primary hover:text-primary/80 h-auto p-0 font-semibold"
        @click="goToRegister"
      >
        Sign up
      </Button>
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { Eye, EyeOff, LogIn } from 'lucide-vue-next'

import Button from '@/components/ui/button/Button.vue'
import Input from '@/components/ui/input/Input.vue'
import Icon from '@/components/ui/icon/Icon.vue'
import Checkbox from '@/components/ui/checkbox/Checkbox.vue'
import Spinner from '@/components/ui/spinner/Spinner.vue'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { loginSchema } from '@/types/auth'

const router = useRouter()
const showPassword = ref(false)
const rememberMe = ref(false)
const isSubmitting = ref(false)

const formSchema = toTypedSchema(loginSchema)

const { handleSubmit } = useForm({
  validationSchema: formSchema,
  initialValues: {
    email: '',
    password: '',
  },
})

const onSubmit = handleSubmit(async (values) => {
  isSubmitting.value = true
  try {
    console.log('Login values:', values)
    setTimeout(() => {
      isSubmitting.value = false
      router.push({ name: 'Dashboard' })
    }, 1500)
  } catch {
    isSubmitting.value = false
  }
})

const goToRegister = () => {
  router.push({ name: 'Register' })
}

const goToForgotPassword = () => {
  router.push({ name: 'ForgotPassword' })
}
</script>
