<!-- <template>
    <div class="min-h-screen flex items-center justify-center p-8 bg-background overflow-hidden">
      <Card class="w-full max-w-md rounded-2xl shadow-lg border-2">
        <CardHeader class="space-y-4 pb-8 pt-8 px-8">
          <div
            class="flex items-center justify-center w-16 h-16 rounded-2xl bg-primary text-primary-foreground mb-2 mx-auto shadow-lg"
          >
            <Sparkles class="w-8 h-8" />
          </div>
          <CardTitle class="text-3xl font-bold text-center">Join StudySpark</CardTitle>
          <CardDescription class="text-center text-base">
            Create your account and start learning today
          </CardDescription>
        </CardHeader>

        <CardContent class="space-y-6 px-8">
          <Alert
            v-if="error"
            variant="destructive"
            class="rounded-xl border-destructive bg-destructive/10"
          >
            <AlertDescription class="font-medium text-destructive">{{ error }}</AlertDescription>
          </Alert>

          <div class="space-y-3">
            <Label for="name" class="text-sm font-semibold">Full Name</Label>
            <Input
              id="name"
              v-model="name"
              type="text"
              placeholder="Enter your full name"
              :class="[
                'rounded-xl h-12 px-4',
                nameError ? 'border-destructive focus:ring-destructive' : '',
              ]"
              @input="nameError = ''"
            />
            <p v-if="nameError" class="text-sm text-destructive">{{ nameError }}</p>
          </div>

          <div class="space-y-3">
            <Label for="email" class="text-sm font-semibold">Email Address</Label>
            <Input
              id="email"
              v-model="email"
              type="email"
              placeholder="Enter your email"
              :class="[
                'rounded-xl h-12 px-4',
                emailError ? 'border-destructive focus:ring-destructive' : '',
              ]"
              @blur="validateEmail"
              @input="emailError = ''"
            />
            <p v-if="emailError" class="text-sm text-destructive">{{ emailError }}</p>
          </div>

          <div class="space-y-3">
            <Label for="password" class="text-sm font-semibold">Password</Label>
            <div class="relative">
              <Input
                id="password"
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Create a strong password (min 6 characters)"
                :class="[
                  'rounded-xl h-12 px-4 pr-12',
                  passwordError ? 'border-destructive focus:ring-destructive' : '',
                ]"
                @input="passwordError = ''"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                class="absolute right-1 top-1/2 -translate-y-1/2 h-10 w-10 rounded-lg"
                @click="showPassword = !showPassword"
              >
                <EyeOff v-if="showPassword" class="w-5 h-5 text-muted-foreground" />
                <Eye v-else class="w-5 h-5 text-muted-foreground" />
              </Button>
            </div>
            <p v-if="passwordError" class="text-sm text-destructive">{{ passwordError }}</p>
          </div>

          <div class="space-y-3">
            <Label for="confirmPassword" class="text-sm font-semibold">Confirm Password</Label>
            <div class="relative">
              <Input
                id="confirmPassword"
                v-model="confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                placeholder="Re-enter your password"
                :class="[
                  'rounded-xl h-12 px-4 pr-12',
                  confirmPasswordError ? 'border-destructive focus:ring-destructive' : '',
                ]"
                @input="confirmPasswordError = ''"
                @keydown.enter="handleSubmit"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                class="absolute right-1 top-1/2 -translate-y-1/2 h-10 w-10 rounded-lg"
                @click="showConfirmPassword = !showConfirmPassword"
              >
                <EyeOff v-if="showConfirmPassword" class="w-5 h-5 text-muted-foreground" />
                <Eye v-else class="w-5 h-5 text-muted-foreground" />
              </Button>
            </div>
            <p v-if="confirmPasswordError" class="text-sm text-destructive">
              {{ confirmPasswordError }}
            </p>
          </div>
        </CardContent>

        <CardFooter class="flex flex-col space-y-5 pt-4 pb-8 px-8">
          <Button
            :disabled="loading"
            class="w-full rounded-xl h-12 font-semibold shadow-lg transition-all"
            @click="handleSubmit"
          >
            {{ loading ? 'Creating account...' : 'Create Account' }}
          </Button>

          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-4 bg-card text-muted-foreground font-medium">or continue with</span>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            :disabled="googleLoading"
            class="w-full rounded-xl h-12 border-2 font-semibold transition-all"
            @click="handleGoogleSignup"
          >
            <svg class="w-5 h-5 mr-3" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            {{ googleLoading ? 'Connecting...' : 'Sign up with Google' }}
          </Button>

          <div class="text-center pt-2">
            <span class="text-sm text-muted-foreground">Already have an account?</span>
            <Button
              type="button"
              variant="link"
              class="p-0 h-auto ml-1 font-semibold text-sm"
              @click="goToLogin"
            >
              Sign in
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  </template>

  <script setup lang="ts">
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { Sparkles, Eye, EyeOff } from 'lucide-vue-next'

  import { useAuthStore } from '@/stores/auth.store'
  import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from '@/components/ui/card'
  import { Input } from '@/components/ui/input'
  import { Label } from '@/components/ui/label'
  import { Button } from '@/components/ui/button'
  import { Alert, AlertDescription } from '@/components/ui/alert'

  const router = useRouter()
  const authStore = useAuthStore()

  const name = ref('')
  const email = ref('')
  const password = ref('')
  const confirmPassword = ref('')
  const showPassword = ref(false)
  const showConfirmPassword = ref(false)
  const loading = ref(false)
  const googleLoading = ref(false)
  const error = ref('')
  const nameError = ref('')
  const emailError = ref('')
  const passwordError = ref('')
  const confirmPasswordError = ref('')

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email.value) {
      emailError.value = ''
    } else if (!emailRegex.test(email.value)) {
      emailError.value = 'Please enter a valid email address'
    } else {
      emailError.value = ''
    }
  }

  const handleSubmit = async () => {
    error.value = ''
    nameError.value = ''
    emailError.value = ''
    passwordError.value = ''
    confirmPasswordError.value = ''

    // Validate all fields
    let hasError = false

    if (!name.value) {
      nameError.value = 'Full name is required'
      hasError = true
    }

    if (!email.value) {
      emailError.value = 'Email is required'
      hasError = true
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email.value)) {
        emailError.value = 'Please enter a valid email address'
        hasError = true
      }
    }

    if (!password.value) {
      passwordError.value = 'Password is required'
      hasError = true
    } else if (password.value.length < 6) {
      passwordError.value = 'Password must be at least 6 characters long'
      hasError = true
    }

    if (!confirmPassword.value) {
      confirmPasswordError.value = 'Please confirm your password'
      hasError = true
    } else if (password.value !== confirmPassword.value) {
      confirmPasswordError.value = 'Passwords do not match'
      hasError = true
    }
  https://thanh.tech/
    if (hasError) return

    loading.value = true
    const success = await authStore.register(email.value, password.value, name.value)

    if (success) {
      router.push('/profile')
    } else {
      error.value = 'Registration failed. Please try again.'
    }

    loading.value = false
  }

  const handleGoogleSignup = async () => {
    error.value = ''
    googleLoading.value = true

    await authStore.registerWithGoogle()
    router.push('/profile')

    googleLoading.value = false
  }

  const goToLogin = () => {
    router.push('/login')
  }
  </script> -->

<template>
  <div class="flex w-full max-w-sm flex-col gap-6 p-10">
    <div class="absolute top-8 right-8 flex items-center gap-2">
      <span class="text-muted-foreground text-sm">Already have an account?</span>
      <Button
        type="button"
        variant="link"
        class="text-primary hover:text-primary/80 cursor-pointer p-0 text-sm font-semibold focus:outline-none focus-visible:ring-0"
        @click="goToLogin"
      >
        Sign in
      </Button>
    </div>
    <p class="text-5xl font-bold">Create an account</p>
    <p class="text-muted-foreground text-sm">Create your account and start learning today</p>
    <div class="space-y-8">
      <div class="flex flex-col gap-3">
        <Input placeholder="Full Name" />
        <Input placeholder="Email" />
        <Input type="password" placeholder="Password" />
        <Input type="password" placeholder="Confirm Password" />
        <Button class="h-12 cursor-pointer">Create account</Button>
      </div>
      <div class="relative">
        <Separator />
        <p
          class="bg-background text-muted-foreground absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-2 text-center text-sm"
        >
          Or continue with
        </p>
      </div>
      <div class="flex items-center justify-center gap-2">
        <Button type="button" variant="outline" class="flex-1 cursor-pointer">
          <Icon name="google" />
          Google
        </Button>
        <Button type="button" variant="outline" class="flex-1 cursor-pointer">
          <Icon name="facebook" />
          Facebook
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from '@/router'

import Button from '@/components/ui/button/Button.vue'
import Input from '@/components/ui/input/Input.vue'
import Separator from '@/components/ui/separator/Separator.vue'
import Icon from '@/components/ui/icon/Icon.vue'

const goToLogin = () => {
  router.push({ name: 'Login' })
}
</script>
