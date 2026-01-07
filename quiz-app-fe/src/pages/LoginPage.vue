<template>
  <div class="min-h-screen flex items-center justify-center p-8 bg-background">
    <Card class="w-full max-w-md rounded-2xl shadow-lg border-2">
      <CardHeader class="space-y-4 pb-8 pt-8 px-8">
        <div
          class="flex items-center justify-center w-16 h-16 rounded-2xl bg-primary text-primary-foreground mb-2 mx-auto shadow-lg"
        >
          <Sparkles class="w-8 h-8" />
        </div>
        <CardTitle class="text-3xl font-bold text-center"> Welcome to StudySpark </CardTitle>
        <CardDescription class="text-center text-base">
          Sign in to continue your learning journey
        </CardDescription>
      </CardHeader>

      <CardContent class="space-y-6 px-8">
        <Alert v-if="error" variant="destructive" class="rounded-xl">
          <AlertDescription class="font-medium">{{ error }}</AlertDescription>
        </Alert>

        <div class="space-y-3">
          <Label for="email" class="text-sm font-semibold">Email Address</Label>
          <Input
            id="email"
            v-model="email"
            type="email"
            placeholder="Enter your email"
            class="rounded-xl h-12 px-4"
            @keydown.enter="handleSubmit"
          />
        </div>

        <div class="space-y-3">
          <Label for="password" class="text-sm font-semibold">Password</Label>
          <div class="relative">
            <Input
              id="password"
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Enter your password"
              class="rounded-xl h-12 px-4 pr-12"
              @keydown.enter="handleSubmit"
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
        </div>

        <div class="flex items-center justify-between pt-1">
          <div class="flex items-center space-x-2">
            <Checkbox id="remember" v-model:checked="rememberMe" class="rounded" />
            <Label for="remember" class="text-sm font-medium cursor-pointer"> Remember me </Label>
          </div>

          <Button
            type="button"
            variant="link"
            class="p-0 h-auto font-semibold text-sm"
            @click="goToForgotPassword"
          >
            Forgot password?
          </Button>
        </div>
      </CardContent>

      <CardFooter class="flex flex-col space-y-5 pt-4 pb-8 px-8">
        <Button
          :disabled="loading"
          class="w-full rounded-xl h-12 font-semibold shadow-lg transition-all"
          @click="handleSubmit"
        >
          {{ loading ? 'Signing in...' : 'Sign In' }}
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
          {{ googleLoading ? 'Connecting...' : 'Sign in with Google' }}
        </Button>

        <div class="text-center pt-2">
          <span class="text-sm text-muted-foreground">Don't have an account?</span>
          <Button
            type="button"
            variant="link"
            class="p-0 h-auto ml-1 font-semibold text-sm"
            @click="goToRegister"
          >
            Create account
          </Button>
        </div>
      </CardFooter>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
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
import { Checkbox } from '@/components/ui/checkbox'
import { Alert, AlertDescription } from '@/components/ui/alert'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const showPassword = ref(false)
const loading = ref(false)
const googleLoading = ref(false)
const error = ref('')

onMounted(() => {
  const remembered = authStore.getRememberedEmail()
  if (remembered) {
    email.value = remembered
    rememberMe.value = true
  }
})

const handleSubmit = async () => {
  error.value = ''
  loading.value = true

  const success = await authStore.login(email.value, password.value, rememberMe.value)

  if (success) {
    router.push('/profile')
  } else {
    error.value = 'Invalid email or password. Please try again.'
  }

  loading.value = false
}

const handleGoogleLogin = async () => {
  error.value = ''
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
</script>
