<!-- <template>
  <div class="min-h-screen flex items-center justify-center p-8 bg-background overflow-hidden">
    <Card class="w-full max-w-md rounded-2xl shadow-lg border-2">
      <CardHeader class="space-y-4 pb-8 pt-8 px-8">
        <div
          class="flex items-center justify-center w-16 h-16 rounded-2xl bg-primary text-primary-foreground mb-2 mx-auto shadow-lg"
        >
          <Sparkles class="w-8 h-8" />
        </div>
        <CardTitle class="text-3xl font-bold text-center"> Log in to your account </CardTitle>
      </CardHeader>

      <CardContent class="space-y-6 px-8">
        <div class="space-y-2">
          <Label for="username" class="text-sm font-semibold"> Username or email </Label>
          <Input
            id="username"
            v-model="username"
            type="text"
            placeholder="Type your username or email"
            :class="[
              'rounded-lg h-12 px-4 transition-all',
              usernameError ? 'border-destructive focus-visible:ring-destructive' : '',
            ]"
            @input="clearUsernameError"
            @blur="validateUsername"
            @keydown.enter="handleSubmit"
          />
          <div v-if="usernameError" class="flex items-start gap-2 mt-2">
            <AlertCircle class="w-4 h-4 text-destructive mt-0.5 shrink-0" />
            <p class="text-sm text-destructive leading-tight">{{ usernameError }}</p>
          </div>
        </div>

        <div class="space-y-2">
          <Label for="password" class="text-sm font-semibold"> Password </Label>
          <div class="relative">
            <Input
              id="password"
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Type your password"
              :class="[
                'rounded-lg h-12 px-4 pr-12 transition-all',
                passwordError ? 'border-destructive focus-visible:ring-destructive' : '',
              ]"
              @input="clearPasswordError"
              @keydown.enter="handleSubmit"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              class="absolute right-1 top-1/2 -translate-y-1/2 h-10 w-10 rounded-lg"
              @click="showPassword = !showPassword"
            >
              <EyeOff v-if="showPassword" class="w-4 h-4 text-muted-foreground" />
              <Eye v-else class="w-4 h-4 text-muted-foreground" />
            </Button>
          </div>
          <div v-if="passwordError" class="flex items-start gap-2 mt-2">
            <AlertCircle class="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
            <p class="text-sm text-destructive leading-tight">{{ passwordError }}</p>
          </div>
        </div>

        <div
          v-if="generalError"
          class="rounded-lg bg-destructive/10 border border-destructive/20 p-4"
        >
          <div class="flex items-start gap-3">
            <XCircle class="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
            <div class="flex-1">
              <p class="text-sm font-semibold text-destructive mb-1">
                Incorrect username or password
              </p>
              <p class="text-sm text-destructive/80">
                The login details you entered are incorrect. Try again...
              </p>
            </div>
          </div>
        </div>

        <div class="flex items-center justify-between pt-2">
          <div class="flex items-center space-x-2">
            <Checkbox
              id="remember"
              v-model:checked="rememberMe"
              class="rounded data-[state=checked]:bg-primary data-[state=checked]:border-primary"
            />
            <Label
              for="remember"
              class="text-sm font-medium cursor-pointer select-none"
              @click="rememberMe = !rememberMe"
            >
              Remember me
            </Label>
          </div>

          <Button
            type="button"
            variant="link"
            class="p-0 h-auto font-semibold text-sm text-primary hover:text-primary/80"
            @click="goToForgotPassword"
          >
            Forgot Password?
          </Button>
        </div>
      </CardContent>

      <CardFooter class="flex flex-col space-y-5 pt-4 pb-8 px-8">
        <Button
          :disabled="loading"
          class="w-full rounded-lg h-12 font-semibold shadow-md transition-all hover:shadow-lg"
          @click="handleSubmit"
        >
          <Loader2 v-if="loading" class="w-4 h-4 mr-2 animate-spin" />
          {{ loading ? 'Logging in...' : 'Log in' }}
        </Button>

        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-4 bg-card text-muted-foreground font-medium">or</span>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          :disabled="googleLoading"
          class="w-full rounded-lg h-12 border-2 font-semibold transition-all hover:bg-accent"
          @click="handleGoogleLogin"
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
          {{ googleLoading ? 'Connecting...' : 'Continue with Google' }}
        </Button>

        <div class="text-center pt-4 border-t">
          <span class="text-sm text-muted-foreground">Not a member yet?</span>
          <Button
            type="button"
            variant="link"
            class="p-0 h-auto ml-1 font-semibold text-sm text-primary hover:text-primary/80"
            @click="goToRegister"
          >
            Sign up now
          </Button>
        </div>
      </CardFooter>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Sparkles, Eye, EyeOff, AlertCircle, XCircle, Loader2 } from 'lucide-vue-next'

import { useAuthStore } from '@/stores/auth.store'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'

const router = useRouter()
const authStore = useAuthStore()

const username = ref('')
const password = ref('')
const rememberMe = ref(false)
const showPassword = ref(false)
const loading = ref(false)
const googleLoading = ref(false)
const usernameError = ref('')
const passwordError = ref('')
const generalError = ref(false)

onMounted(() => {
  const remembered = authStore.getRememberedEmail()
  if (remembered) {
    username.value = remembered
    rememberMe.value = true
  }
})

const clearUsernameError = () => {
  usernameError.value = ''
  generalError.value = false
}

const clearPasswordError = () => {
  passwordError.value = ''
  generalError.value = false
}

const validateUsername = () => {
  if (!username.value.trim()) {
    return
  }

  // Check if it's an email format
  const isEmail = username.value.includes('@')

  if (!isEmail) {
    // Validate username format: letters, numbers, underscores, dashes only
    const usernameRegex = /^[a-zA-Z0-9_-]+$/
    if (!usernameRegex.test(username.value)) {
      usernameError.value =
        'Your username may only contain letters, numbers, underscores, and dashes.'
    }
  }
}

const handleSubmit = async () => {
  usernameError.value = ''
  passwordError.value = ''
  generalError.value = false

  // Validate username
  if (!username.value.trim()) {
    usernameError.value = 'Your username cannot be blank.'
    return
  }

  // Check if it's username or email
  const isEmail = username.value.includes('@')

  if (!isEmail) {
    // Validate username format
    const usernameRegex = /^[a-zA-Z0-9_-]+$/
    if (!usernameRegex.test(username.value)) {
      usernameError.value =
        'Your username may only contain letters, numbers, underscores, and dashes.'
      return
    }
  } else {
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(username.value)) {
      usernameError.value = 'Please enter a valid email address.'
      return
    }
  }

  // Validate password
  if (!password.value) {
    passwordError.value = 'Your password cannot be blank.'
    return
  }

  loading.value = true

  const success = await authStore.login(username.value, password.value, rememberMe.value)

  if (success) {
    router.push('/profile')
  } else {
    generalError.value = true
  }

  loading.value = false
}

const handleGoogleLogin = async () => {
  usernameError.value = ''
  passwordError.value = ''
  generalError.value = false
  googleLoading.value = true

  await authStore.loginWithGoogle()
  router.push('/profile')

  googleLoading.value = false
}

const goToRegister = () => {
  router.push('/register')
}

const goToForgotPassword = () => {
  router.push('/forgot-password')
}
</script> -->
<template>
  <div class="flex w-full max-w-sm flex-col gap-6 p-10">
    <div class="absolute top-8 right-8 flex items-center gap-2">
      <span class="text-muted-foreground text-sm">Don't have an account?</span>
      <Button
        type="button"
        variant="link"
        class="text-primary hover:text-primary/80 p-0 text-sm font-semibold focus:outline-none focus-visible:ring-0"
        >Sign up</Button
      >
    </div>
    <p class="text-5xl font-bold">Sign in</p>
    <div class="space-y-5">
      <p class="text-sm">Sign in with Open Account</p>
      <div class="flex items-center justify-center gap-2">
        <Button type="button" variant="outline" class="flex-1">
          <Icon name="google" />
          Google
        </Button>
        <Button type="button" variant="outline" class="flex-1">
          <Icon name="facebook" />
          Facebook
        </Button>
      </div>
    </div>
    <Separator />
    <div class="space-y-5">
      <p class="text-sm">Or continue with email address</p>
      <div class="flex flex-col gap-3">
        <Input placeholder="Email or Username" />
        <Input type="password" placeholder="Password" />
        <Button class="h-12">Sign in</Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue'
import Input from '@/components/ui/input/Input.vue'
import Separator from '@/components/ui/separator/Separator.vue'
import { Icon } from '@/components/ui/icon'
</script>
