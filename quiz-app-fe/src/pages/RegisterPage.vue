<template>
  <div class="flex w-full max-w-md flex-col gap-8">
    <!-- Title Section -->
    <div class="animate-fade-in-down text-center lg:text-left">
      <h1 class="text-foreground text-3xl font-bold tracking-tight">Create an account</h1>
      <p class="text-muted-foreground mt-2 text-base">
        Join StudySpark and start your learning journey
      </p>
    </div>

    <!-- Success Message -->
    <Alert v-if="successMessage" class="animate-fade-in-up border-chart-2 bg-chart-2/10">
      <CheckCircle class="text-chart-2 h-4 w-4" />
      <AlertDescription class="text-chart-2">
        {{ successMessage }}
      </AlertDescription>
    </Alert>

    <!-- Error Message -->
    <Alert v-if="errorMessage" variant="destructive" class="animate-fade-in-up">
      <AlertCircle class="h-4 w-4" />
      <AlertDescription>
        {{ errorMessage }}
      </AlertDescription>
    </Alert>

    <!-- Register Form -->
    <form class="animate-fade-in-up delay-100 space-y-5" @submit="handleSignUp">
      <!-- Email Field -->
      <FormField v-slot="{ componentField }" name="email">
        <FormItem class="space-y-2">
          <FormLabel class="text-foreground text-sm font-medium">Email address</FormLabel>
          <FormControl>
            <div class="relative">
              <Mail
                class="text-muted-foreground pointer-events-none absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2"
              />
              <Input
                v-bind="componentField"
                type="email"
                placeholder="name@example.com"
                class="border-input bg-background focus:border-primary focus:ring-primary/20 h-12 rounded-xl pl-12 text-base transition-all focus:ring-2"
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <!-- Password Field -->
      <FormField v-slot="{ componentField }" name="password">
        <FormItem class="space-y-2">
          <FormLabel class="text-foreground text-sm font-medium">Password</FormLabel>
          <FormControl>
            <div class="relative">
              <Lock
                class="text-muted-foreground pointer-events-none absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2"
              />
              <Input
                v-bind="componentField"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Create a strong password"
                class="border-input bg-background focus:border-primary focus:ring-primary/20 h-12 rounded-xl pl-12 pr-12 text-base transition-all focus:ring-2"
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

      <!-- Confirm Password Field -->
      <FormField v-slot="{ componentField }" name="confirmPassword">
        <FormItem class="space-y-2">
          <FormLabel class="text-foreground text-sm font-medium">Confirm password</FormLabel>
          <FormControl>
            <div class="relative">
              <Lock
                class="text-muted-foreground pointer-events-none absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2"
              />
              <Input
                v-bind="componentField"
                :type="showConfirmPassword ? 'text' : 'password'"
                placeholder="Confirm your password"
                class="border-input bg-background focus:border-primary focus:ring-primary/20 h-12 rounded-xl pl-12 pr-12 text-base transition-all focus:ring-2"
              />
              <button
                type="button"
                class="text-muted-foreground hover:text-foreground absolute top-1/2 right-4 -translate-y-1/2 p-1 transition-colors"
                @click="showConfirmPassword = !showConfirmPassword"
              >
                <Eye v-if="showConfirmPassword" class="h-5 w-5" />
                <EyeOff v-else class="h-5 w-5" />
              </button>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <!-- Terms Agreement -->
      <div class="flex items-start gap-3">
        <Checkbox v-model:checked="agreeTerms" class="mt-0.5 cursor-pointer" />
        <span class="text-muted-foreground text-sm leading-relaxed">
          I agree to the
          <Button
            type="button"
            variant="link"
            class="text-primary hover:text-primary/80 h-auto p-0 font-medium"
            @click="openTermsOfService"
          >
            Terms of Service
          </Button>
          and
          <Button
            type="button"
            variant="link"
            class="text-primary hover:text-primary/80 h-auto p-0 font-medium"
            @click="openPrivacyPolicy"
          >
            Privacy Policy
          </Button>
        </span>
      </div>

      <!-- Submit Button -->
      <Button
        type="submit"
        :disabled="isSubmitting || !agreeTerms"
        class="bg-primary text-primary-foreground hover:bg-primary/90 h-12 w-full cursor-pointer rounded-xl text-base font-semibold shadow-sm transition-all duration-200 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Spinner v-if="isSubmitting" class="mr-2 h-5 w-5 animate-spin" />
        <span>{{ isSubmitting ? 'Creating account...' : 'Create account' }}</span>
      </Button>
    </form>

    <!-- Divider -->
    <div class="animate-fade-in-up delay-200 relative">
      <div class="absolute inset-0 flex items-center">
        <div class="border-border w-full border-t"></div>
      </div>
      <div class="relative flex justify-center">
        <span class="bg-background text-muted-foreground px-4 text-sm">Or sign up with</span>
      </div>
    </div>

    <!-- Social Login -->
    <div class="animate-fade-in-up delay-300 grid grid-cols-2 gap-4">
      <Button
        type="button"
        variant="outline"
        :disabled="isSubmitting"
        class="border-border hover:bg-accent h-12 cursor-pointer gap-2 rounded-xl text-sm font-medium transition-all"
        @click="handleGoogleSignUp"
      >
        <Icon name="google" class="h-5 w-5" />
        Google
      </Button>
      <Button
        type="button"
        variant="outline"
        :disabled="isSubmitting"
        class="border-border hover:bg-accent h-12 cursor-pointer gap-2 rounded-xl text-sm font-medium transition-all"
        @click="handleFacebookSignUp"
      >
        <Icon name="facebook" class="h-5 w-5" />
        Facebook
      </Button>
    </div>

    <!-- Sign in link -->
    <p class="animate-fade-in-up delay-400 text-muted-foreground text-center text-sm">
      Already have an account?
      <Button
        type="button"
        variant="link"
        class="text-primary hover:text-primary/80 h-auto p-0 font-semibold"
        @click="goToLogin"
      >
        Sign in
      </Button>
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { Eye, EyeOff, Mail, Lock, CheckCircle, AlertCircle } from 'lucide-vue-next'

import Button from '@/components/ui/button/Button.vue'
import Input from '@/components/ui/input/Input.vue'
import Icon from '@/components/ui/icon/Icon.vue'
import Checkbox from '@/components/ui/checkbox/Checkbox.vue'
import Spinner from '@/components/ui/spinner/Spinner.vue'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useAuthStore } from '@/stores/auth.store'

const registerSchema = z
  .object({
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

const router = useRouter()
const authStore = useAuthStore()

const showPassword = ref(false)
const showConfirmPassword = ref(false)
const agreeTerms = ref(false)
const isSubmitting = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const { handleSubmit } = useForm({
  validationSchema: toTypedSchema(registerSchema),
  initialValues: {
    email: '',
    password: '',
    confirmPassword: '',
  },
})

const handleSignUp = handleSubmit(async (values) => {
  if (isSubmitting.value || !agreeTerms.value) return

  isSubmitting.value = true
  errorMessage.value = ''
  successMessage.value = ''

  try {
    const result = await authStore.register(values.email, values.password)

    if (result.success) {
      successMessage.value = result.message || 'Account created successfully! Redirecting to login...'
      // Redirect to login after 2 seconds
      setTimeout(() => {
        router.push({ name: 'Login', query: { email: values.email } })
      }, 2000)
    } else {
      errorMessage.value = result.message || 'Registration failed. Please try again.'
    }
  } catch (error) {
    console.error('Registration error:', error)
    errorMessage.value = 'An unexpected error occurred. Please try again.'
  } finally {
    isSubmitting.value = false
  }
})

const goToLogin = () => {
  router.push({ name: 'Login' })
}

const handleGoogleSignUp = async () => {
  if (isSubmitting.value) return

  isSubmitting.value = true
  errorMessage.value = ''

  try {
    const result = await authStore.registerWithGoogle()
    if (result.success) {
      router.push({ name: 'Dashboard' })
    } else {
      errorMessage.value = result.message || 'Google sign up failed'
    }
  } catch (error) {
    console.error('Google sign up error:', error)
    errorMessage.value = 'Google sign up failed. Please try again.'
  } finally {
    isSubmitting.value = false
  }
}

const handleFacebookSignUp = () => {
  // TODO: Implement Facebook OAuth sign up
  errorMessage.value = 'Facebook sign up is not available yet.'
}

const openTermsOfService = () => {
  window.open('/terms-of-service', '_blank')
}

const openPrivacyPolicy = () => {
  window.open('/privacy-policy', '_blank')
}
</script>
