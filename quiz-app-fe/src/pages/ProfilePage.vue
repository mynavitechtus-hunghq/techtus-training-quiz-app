<template>
  <div class="min-h-screen p-6 bg-background overflow-hidden">
    <div class="max-w-3xl mx-auto py-8 space-y-8">
      <!-- Header -->
      <div class="text-center space-y-3">
        <h1 class="text-4xl font-bold">Your Profile</h1>
        <p class="text-lg text-muted-foreground">Manage your account information and settings</p>
      </div>

      <!-- Profile Card -->
      <Card class="rounded-2xl shadow-lg overflow-hidden">
        <div class="bg-primary h-32"></div>

        <CardHeader class="-mt-16 relative">
          <div class="flex flex-col items-center space-y-4">
            <div
              class="w-24 h-24 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center text-3xl font-bold shadow-xl ring-4 ring-card"
            >
              {{ userInitial }}
            </div>
            <div class="text-center">
              <CardTitle class="text-2xl font-bold">{{ authStore.user?.name || 'User' }}</CardTitle>
              <CardDescription class="text-base mt-1">{{ authStore.user?.email }}</CardDescription>
            </div>
            <Badge class="rounded-full px-4 py-1.5 font-semibold"> User Account </Badge>
          </div>
        </CardHeader>

        <CardContent class="space-y-6 pt-6">
          <!-- Account Information Section -->
          <div class="space-y-4">
            <h3 class="text-lg font-semibold flex items-center gap-2">
              <User class="w-5 h-5" />
              Account Information
            </h3>

            <div class="grid gap-4">
              <!-- Name -->
              <div
                v-if="authStore.user?.name"
                class="flex items-start gap-4 p-5 rounded-xl bg-muted border"
              >
                <div
                  class="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center"
                >
                  <User class="w-5 h-5 text-primary" />
                </div>
                <div class="flex-1 min-w-0">
                  <Label class="text-sm font-semibold block mb-1"> Full Name </Label>
                  <p class="text-base font-medium">
                    {{ authStore.user.name }}
                  </p>
                </div>
              </div>

              <!-- Email -->
              <div class="flex items-start gap-4 p-5 rounded-xl bg-muted border">
                <div
                  class="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center"
                >
                  <Mail class="w-5 h-5 text-primary" />
                </div>
                <div class="flex-1 min-w-0">
                  <Label class="text-sm font-semibold block mb-1"> Email Address </Label>
                  <p class="text-base font-medium break-all">
                    {{ authStore.user?.email }}
                  </p>
                </div>
              </div>

              <!-- Authentication Status -->
              <div
                class="flex items-start gap-4 p-5 rounded-xl bg-chart-2/10 border border-chart-2/20"
              >
                <div
                  class="flex-shrink-0 w-10 h-10 rounded-lg bg-chart-2/20 flex items-center justify-center"
                >
                  <Shield class="w-5 h-5 text-chart-2" />
                </div>
                <div class="flex-1 min-w-0">
                  <Label class="text-sm font-semibold block mb-1"> Security Status </Label>
                  <p class="text-base font-semibold mb-1">✓ Authenticated</p>
                  <p class="text-sm text-muted-foreground">Your session is active and secure</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter class="pt-6 pb-6">
          <Button
            variant="destructive"
            class="w-full rounded-xl h-12 font-semibold shadow-lg"
            @click="handleLogout"
          >
            <LogOut class="w-5 h-5 mr-2" />
            Sign Out
          </Button>
        </CardFooter>
      </Card>

      <!-- Info Card -->
      <Card class="rounded-2xl shadow-lg bg-muted/50">
        <CardContent class="pt-6 pb-6">
          <div class="space-y-3">
            <p class="font-semibold flex items-center gap-2 text-lg">
              <span class="text-2xl">ℹ️</span>
              Account Features
            </p>
            <ul class="space-y-2.5 text-muted-foreground">
              <li class="flex items-start gap-3">
                <span class="text-primary font-bold mt-0.5">•</span>
                <span>Secure authentication with password protection</span>
              </li>
              <li class="flex items-start gap-3">
                <span class="text-primary font-bold mt-0.5">•</span>
                <span>Remember me functionality for convenience</span>
              </li>
              <li class="flex items-start gap-3">
                <span class="text-primary font-bold mt-0.5">•</span>
                <span>Google sign-in integration</span>
              </li>
              <li class="flex items-start gap-3">
                <span class="text-primary font-bold mt-0.5">•</span>
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
