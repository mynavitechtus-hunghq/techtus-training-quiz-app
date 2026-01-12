<template>
  <div class="bg-background min-h-screen overflow-hidden p-6">
    <div class="mx-auto max-w-3xl space-y-8 py-8">
      <!-- Header -->
      <div class="space-y-3 text-center">
        <h1 class="text-4xl font-bold">Your Profile</h1>
        <p class="text-muted-foreground text-lg">Manage your account information and settings</p>
      </div>

      <!-- Profile Card -->
      <Card class="overflow-hidden rounded-2xl shadow-lg">
        <div class="bg-primary h-32"></div>

        <CardHeader class="relative -mt-16">
          <div class="flex flex-col items-center space-y-4">
            <div
              class="bg-primary text-primary-foreground ring-card flex h-24 w-24 items-center justify-center rounded-2xl text-3xl font-bold shadow-xl ring-4"
            >
              {{ userInitial }}
            </div>
            <div class="text-center">
              <CardTitle class="text-2xl font-bold">{{ authStore.user?.name || 'User' }}</CardTitle>
              <CardDescription class="mt-1 text-base">{{ authStore.user?.email }}</CardDescription>
            </div>
            <Badge class="rounded-full px-4 py-1.5 font-semibold"> User Account </Badge>
          </div>
        </CardHeader>

        <CardContent class="space-y-6 pt-6">
          <!-- Account Information Section -->
          <div class="space-y-4">
            <h3 class="flex items-center gap-2 text-lg font-semibold">
              <User class="h-5 w-5" />
              Account Information
            </h3>

            <div class="grid gap-4">
              <!-- Name -->
              <div
                v-if="authStore.user?.name"
                class="bg-muted flex items-start gap-4 rounded-xl border p-5"
              >
                <div
                  class="bg-primary/10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg"
                >
                  <User class="text-primary h-5 w-5" />
                </div>
                <div class="min-w-0 flex-1">
                  <Label class="mb-1 block text-sm font-semibold"> Full Name </Label>
                  <p class="text-base font-medium">
                    {{ authStore.user.name }}
                  </p>
                </div>
              </div>

              <!-- Email -->
              <div class="bg-muted flex items-start gap-4 rounded-xl border p-5">
                <div
                  class="bg-primary/10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg"
                >
                  <Mail class="text-primary h-5 w-5" />
                </div>
                <div class="min-w-0 flex-1">
                  <Label class="mb-1 block text-sm font-semibold"> Email Address </Label>
                  <p class="text-base font-medium break-all">
                    {{ authStore.user?.email }}
                  </p>
                </div>
              </div>

              <!-- Authentication Status -->
              <div
                class="bg-chart-2/10 border-chart-2/20 flex items-start gap-4 rounded-xl border p-5"
              >
                <div
                  class="bg-chart-2/20 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg"
                >
                  <Shield class="text-chart-2 h-5 w-5" />
                </div>
                <div class="min-w-0 flex-1">
                  <Label class="mb-1 block text-sm font-semibold"> Security Status </Label>
                  <p class="mb-1 text-base font-semibold">✓ Authenticated</p>
                  <p class="text-muted-foreground text-sm">Your session is active and secure</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter class="pt-6 pb-6">
          <Button
            variant="destructive"
            class="h-12 w-full rounded-xl font-semibold shadow-lg"
            @click="handleLogout"
          >
            <LogOut class="mr-2 h-5 w-5" />
            Sign Out
          </Button>
        </CardFooter>
      </Card>

      <!-- Info Card -->
      <Card class="bg-muted/50 rounded-2xl shadow-lg">
        <CardContent class="pt-6 pb-6">
          <div class="space-y-3">
            <p class="flex items-center gap-2 text-lg font-semibold">
              <span class="text-2xl">ℹ️</span>
              Account Features
            </p>
            <ul class="text-muted-foreground space-y-2.5">
              <li class="flex items-start gap-3">
                <span class="text-primary mt-0.5 font-bold">•</span>
                <span>Secure authentication with password protection</span>
              </li>
              <li class="flex items-start gap-3">
                <span class="text-primary mt-0.5 font-bold">•</span>
                <span>Remember me functionality for convenience</span>
              </li>
              <li class="flex items-start gap-3">
                <span class="text-primary mt-0.5 font-bold">•</span>
                <span>Google sign-in integration</span>
              </li>
              <li class="flex items-start gap-3">
                <span class="text-primary mt-0.5 font-bold">•</span>
                <span>Password recovery via email</span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { User, Mail, LogOut, Shield } from 'lucide-vue-next'

import { useAuthStore } from '@/stores/auth.store'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const router = useRouter()
const authStore = useAuthStore()

const userInitial = computed(() => {
  if (authStore.user?.name) {
    return authStore.user.name.charAt(0).toUpperCase()
  }
  return authStore.user?.email.charAt(0).toUpperCase() || 'U'
})

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>
