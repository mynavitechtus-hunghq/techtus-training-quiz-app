<template>
  <div class="bg-background flex min-h-screen items-center justify-center overflow-hidden p-8">
    <Card class="w-full max-w-md rounded-2xl border-2 shadow-lg">
      <CardHeader class="space-y-4 px-8 pt-8 pb-8">
        <div
          class="bg-primary text-primary-foreground mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-2xl shadow-lg"
        >
          <KeyRound class="h-8 w-8" />
        </div>
        <CardTitle class="text-center text-3xl font-bold">Reset Password</CardTitle>
        <CardDescription class="px-2 text-center text-base">
          Enter your email and we'll send you instructions to reset your password
        </CardDescription>
      </CardHeader>

      <CardContent class="space-y-6 px-8">
        <Alert v-if="error" variant="destructive" class="rounded-xl">
          <AlertDescription class="font-medium">{{ error }}</AlertDescription>
        </Alert>

        <Alert v-if="success" class="bg-chart-2/10 border-chart-2/20 rounded-xl">
          <AlertDescription class="text-foreground font-medium">
            ✓ Password reset link has been sent to your email!
          </AlertDescription>
        </Alert>

        <div class="space-y-3">
          <Label for="email" class="text-sm font-semibold">Email Address</Label>
          <Input
            id="email"
            v-model="email"
            type="email"
            placeholder="Enter your email"
            class="h-12 rounded-xl px-4"
            @keydown.enter="handleSubmit"
          />
          <p class="text-muted-foreground pt-1 text-sm">
            We'll send password reset instructions to this email
          </p>
        </div>
      </CardContent>

      <CardFooter class="flex flex-col space-y-5 px-8 pt-4 pb-8">
        <Button
          :disabled="loading"
          class="h-12 w-full rounded-xl font-semibold shadow-lg transition-all"
          @click="handleSubmit"
        >
          {{ loading ? 'Sending...' : 'Send Reset Link' }}
        </Button>

        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="bg-card text-muted-foreground px-4 font-medium">or</span>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          class="h-12 w-full rounded-xl border-2 font-semibold"
          @click="goToLogin"
        >
          <ArrowLeft class="mr-2 h-4 w-4" />
          Back to Login
        </Button>
      </CardFooter>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { KeyRound, ArrowLeft } from 'lucide-vue-next'

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

const email = ref('')
const loading = ref(false)
const success = ref(false)
const error = ref('')

const handleSubmit = async () => {
  error.value = ''
  success.value = false
  loading.value = true

  const result = await authStore.resetPassword(email.value)

  if (result) {
    success.value = true
  } else {
    error.value = 'Please enter a valid email address.'
  }

  loading.value = false
}

const goToLogin = () => {
  router.push('/login')
}
</script>
