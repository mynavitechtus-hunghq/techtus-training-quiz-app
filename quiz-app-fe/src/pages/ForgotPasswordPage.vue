<template>
  <div class="min-h-screen flex items-center justify-center p-8 bg-background overflow-hidden">
    <Card class="w-full max-w-md rounded-2xl shadow-lg border-2">
      <CardHeader class="space-y-4 pb-8 pt-8 px-8">
        <div
          class="flex items-center justify-center w-16 h-16 rounded-2xl bg-primary text-primary-foreground mb-2 mx-auto shadow-lg"
        >
          <KeyRound class="w-8 h-8" />
        </div>
        <CardTitle class="text-3xl font-bold text-center">Reset Password</CardTitle>
        <CardDescription class="text-center text-base px-2">
          Enter your email and we'll send you instructions to reset your password
        </CardDescription>
      </CardHeader>

      <CardContent class="space-y-6 px-8">
        <Alert v-if="error" variant="destructive" class="rounded-xl">
          <AlertDescription class="font-medium">{{ error }}</AlertDescription>
        </Alert>

        <Alert v-if="success" class="rounded-xl bg-chart-2/10 border-chart-2/20">
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
            class="rounded-xl h-12 px-4"
            @keydown.enter="handleSubmit"
          />
          <p class="text-sm text-muted-foreground pt-1">
            We'll send password reset instructions to this email
          </p>
        </div>
      </CardContent>

      <CardFooter class="flex flex-col space-y-5 pt-4 pb-8 px-8">
        <Button
          :disabled="loading"
          class="w-full rounded-xl h-12 font-semibold shadow-lg transition-all"
          @click="handleSubmit"
        >
          {{ loading ? 'Sending...' : 'Send Reset Link' }}
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
          class="w-full rounded-xl h-12 border-2 font-semibold"
          @click="goToLogin"
        >
          <ArrowLeft class="w-4 h-4 mr-2" />
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
