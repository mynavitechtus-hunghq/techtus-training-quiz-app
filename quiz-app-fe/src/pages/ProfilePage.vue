<template>
  <div class="p-6 lg:p-8">
    <!-- Header -->
    <div class="animate-fade-in-down mb-8">
      <h1 class="text-foreground text-2xl font-bold tracking-tight lg:text-3xl">Your Profile</h1>
      <p class="text-muted-foreground mt-2 text-base">Manage your personal information and settings</p>
    </div>

    <div class="grid grid-cols-1 gap-6 xl:grid-cols-3 xl:gap-8">
      <!-- Left Column - Avatar & Quick Info -->
      <div class="space-y-6">
        <!-- Avatar Card -->
        <Card class="animate-fade-in-up bg-card border-border overflow-hidden rounded-2xl border">
          <!-- Cover Image -->
          <div class="bg-primary/10 relative h-24">
            <button
              class="bg-background/80 hover:bg-background absolute right-3 top-3 rounded-lg p-2 backdrop-blur-sm transition-colors"
              @click="changeCover"
            >
              <Camera class="text-foreground h-4 w-4" />
            </button>
          </div>

          <!-- Avatar Section -->
          <div class="relative -mt-12 px-6 pb-6">
            <div class="relative inline-block">
              <div
                class="bg-card border-card relative h-24 w-24 overflow-hidden rounded-2xl border-4 shadow-lg"
              >
                <img
                  v-if="profile.avatar"
                  :src="profile.avatar"
                  alt="Avatar"
                  class="h-full w-full object-cover"
                />
                <div
                  v-else
                  class="bg-primary text-primary-foreground flex h-full w-full items-center justify-center text-3xl font-bold"
                >
                  {{ userInitials }}
                </div>
              </div>
              <button
                class="bg-primary text-primary-foreground hover:bg-primary/90 absolute -bottom-1 -right-1 rounded-lg p-2 shadow-lg transition-colors"
                @click="openAvatarUpload"
              >
                <Camera class="h-4 w-4" />
              </button>
              <input
                ref="avatarInput"
                type="file"
                accept="image/*"
                class="hidden"
                @change="handleAvatarChange"
              />
            </div>

            <!-- Name & Role -->
            <div class="mt-4">
              <h2 class="text-foreground text-xl font-bold">{{ profile.fullName || 'Your Name' }}</h2>
              <p class="text-muted-foreground text-sm">{{ profile.title || 'Add your title' }}</p>
            </div>

            <!-- Quick Stats -->
            <div class="border-border mt-4 grid grid-cols-3 gap-4 border-t pt-4">
              <div class="text-center">
                <p class="text-foreground text-lg font-bold">{{ stats.courses }}</p>
                <p class="text-muted-foreground text-xs">Courses</p>
              </div>
              <div class="text-center">
                <p class="text-foreground text-lg font-bold">{{ stats.streak }}</p>
                <p class="text-muted-foreground text-xs">Day Streak</p>
              </div>
              <div class="text-center">
                <p class="text-foreground text-lg font-bold">{{ stats.xp }}</p>
                <p class="text-muted-foreground text-xs">Total XP</p>
              </div>
            </div>
          </div>
        </Card>

        <!-- Social Links Card -->
        <Card class="animate-fade-in-up delay-100 bg-card border-border rounded-2xl border p-6">
          <div class="mb-4 flex items-center justify-between">
            <h3 class="text-foreground flex items-center gap-2 font-semibold">
              <Link2 class="text-primary h-5 w-5" />
              Social Links
            </h3>
            <Button variant="ghost" size="sm" @click="addSocialLink">
              <Plus class="mr-1 h-4 w-4" />
              Add
            </Button>
          </div>

          <div class="space-y-3">
            <div
              v-for="(link, index) in profile.socialLinks"
              :key="index"
              class="social-link-item bg-secondary/50 group flex items-center gap-3 rounded-xl p-3"
            >
              <div class="bg-primary/10 flex h-9 w-9 items-center justify-center rounded-lg">
                <component :is="getSocialIcon(link.platform)" class="text-primary h-4 w-4" />
              </div>
              <div class="min-w-0 flex-1">
                <p class="text-foreground text-sm font-medium">{{ link.platform }}</p>
                <p class="text-muted-foreground truncate text-xs">{{ link.url }}</p>
              </div>
              <div class="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                <button
                  class="hover:bg-secondary rounded-lg p-1.5 transition-colors"
                  @click="editSocialLink(index)"
                >
                  <Pencil class="text-muted-foreground h-3.5 w-3.5" />
                </button>
                <button
                  class="hover:bg-destructive/10 rounded-lg p-1.5 transition-colors"
                  @click="removeSocialLink(index)"
                >
                  <Trash2 class="text-destructive h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            <div
              v-if="profile.socialLinks.length === 0"
              class="text-muted-foreground py-4 text-center text-sm"
            >
              No social links added yet
            </div>
          </div>
        </Card>

        <!-- Achievements Card -->
        <Card class="animate-fade-in-up delay-200 bg-card border-border rounded-2xl border p-6">
          <h3 class="text-foreground mb-4 flex items-center gap-2 font-semibold">
            <Trophy class="text-primary h-5 w-5" />
            Achievements
          </h3>
          <div class="flex flex-wrap gap-3">
            <div
              v-for="badge in achievements"
              :key="badge.id"
              class="group relative"
            >
              <div
                class="flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                :class="badge.earned ? 'bg-primary/10' : 'bg-secondary opacity-50'"
              >
                <component
                  :is="badge.icon"
                  class="h-5 w-5"
                  :class="badge.earned ? 'text-primary' : 'text-muted-foreground'"
                />
              </div>
              <div class="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span class="bg-foreground text-background rounded px-2 py-1 text-xs">{{ badge.name }}</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <!-- Right Column - Editable Info -->
      <div class="space-y-6 xl:col-span-2">
        <!-- Personal Information -->
        <Card class="animate-fade-in-up delay-100 bg-card border-border rounded-2xl border p-6">
          <div class="mb-6 flex items-center justify-between">
            <h3 class="text-foreground flex items-center gap-2 text-lg font-semibold">
              <User class="text-primary h-5 w-5" />
              Personal Information
            </h3>
            <Button
              v-if="!isEditing"
              variant="outline"
              size="sm"
              @click="startEditing"
            >
              <Pencil class="mr-1 h-4 w-4" />
              Edit
            </Button>
            <div v-else class="flex gap-2">
              <Button variant="ghost" size="sm" @click="cancelEditing">
                Cancel
              </Button>
              <Button size="sm" @click="saveProfile">
                <Check class="mr-1 h-4 w-4" />
                Save
              </Button>
            </div>
          </div>

          <div class="grid gap-5 sm:grid-cols-2">
            <!-- Full Name -->
            <div class="space-y-2">
              <Label class="text-foreground text-sm font-medium">Full Name</Label>
              <div v-if="!isEditing" class="bg-secondary/50 text-foreground rounded-xl px-4 py-3">
                {{ profile.fullName || 'Not set' }}
              </div>
              <Input
                v-else
                v-model="editForm.fullName"
                placeholder="Enter your full name"
                class="h-11 rounded-xl"
              />
            </div>

            <!-- Username -->
            <div class="space-y-2">
              <Label class="text-foreground text-sm font-medium">Username</Label>
              <div v-if="!isEditing" class="bg-secondary/50 text-foreground rounded-xl px-4 py-3">
                @{{ profile.username || 'username' }}
              </div>
              <div v-else class="relative">
                <span class="text-muted-foreground absolute left-4 top-1/2 -translate-y-1/2">@</span>
                <Input
                  v-model="editForm.username"
                  placeholder="username"
                  class="h-11 rounded-xl pl-8"
                />
              </div>
            </div>

            <!-- Email -->
            <div class="space-y-2">
              <Label class="text-foreground text-sm font-medium">Email Address</Label>
              <div v-if="!isEditing" class="bg-secondary/50 text-foreground flex items-center gap-2 rounded-xl px-4 py-3">
                <Mail class="text-muted-foreground h-4 w-4" />
                {{ profile.email }}
              </div>
              <Input
                v-else
                v-model="editForm.email"
                type="email"
                placeholder="your@email.com"
                class="h-11 rounded-xl"
              />
            </div>

            <!-- Phone -->
            <div class="space-y-2">
              <Label class="text-foreground text-sm font-medium">Phone Number</Label>
              <div v-if="!isEditing" class="bg-secondary/50 text-foreground flex items-center gap-2 rounded-xl px-4 py-3">
                <Phone class="text-muted-foreground h-4 w-4" />
                {{ profile.phone || 'Not set' }}
              </div>
              <Input
                v-else
                v-model="editForm.phone"
                type="tel"
                placeholder="+84 123 456 789"
                class="h-11 rounded-xl"
              />
            </div>

            <!-- Title/Role -->
            <div class="space-y-2">
              <Label class="text-foreground text-sm font-medium">Title / Role</Label>
              <div v-if="!isEditing" class="bg-secondary/50 text-foreground rounded-xl px-4 py-3">
                {{ profile.title || 'Not set' }}
              </div>
              <Input
                v-else
                v-model="editForm.title"
                placeholder="e.g. Student, Developer"
                class="h-11 rounded-xl"
              />
            </div>

            <!-- Location -->
            <div class="space-y-2">
              <Label class="text-foreground text-sm font-medium">Location</Label>
              <div v-if="!isEditing" class="bg-secondary/50 text-foreground flex items-center gap-2 rounded-xl px-4 py-3">
                <MapPin class="text-muted-foreground h-4 w-4" />
                {{ profile.location || 'Not set' }}
              </div>
              <Input
                v-else
                v-model="editForm.location"
                placeholder="City, Country"
                class="h-11 rounded-xl"
              />
            </div>
          </div>
        </Card>

        <!-- Bio Section -->
        <Card class="animate-fade-in-up delay-200 bg-card border-border rounded-2xl border p-6">
          <div class="mb-4 flex items-center justify-between">
            <h3 class="text-foreground flex items-center gap-2 text-lg font-semibold">
              <FileText class="text-primary h-5 w-5" />
              Bio
            </h3>
            <span class="text-muted-foreground text-sm">
              {{ (isEditing ? editForm.bio : profile.bio)?.length || 0 }}/{{ maxBioLength }}
            </span>
          </div>

          <div v-if="!isEditing" class="bg-secondary/50 min-h-25 rounded-xl p-4">
            <p v-if="profile.bio" class="text-foreground whitespace-pre-wrap">{{ profile.bio }}</p>
            <p v-else class="text-muted-foreground italic">No bio added yet. Tell us about yourself!</p>
          </div>
          <textarea
            v-else
            v-model="editForm.bio"
            :maxlength="maxBioLength"
            placeholder="Write something about yourself..."
            class="border-input bg-background text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20 min-h-30 w-full resize-none rounded-xl border px-4 py-3 text-sm transition-colors focus:outline-none focus:ring-2"
          ></textarea>
        </Card>

        <!-- Learning Preferences -->
        <Card class="animate-fade-in-up delay-300 bg-card border-border rounded-2xl border p-6">
          <h3 class="text-foreground mb-4 flex items-center gap-2 text-lg font-semibold">
            <Settings class="text-primary h-5 w-5" />
            Learning Preferences
          </h3>

          <div class="grid gap-4 sm:grid-cols-2">
            <!-- Daily Goal -->
            <div class="bg-secondary/50 rounded-xl p-4">
              <div class="mb-3 flex items-center justify-between">
                <Label class="text-foreground text-sm font-medium">Daily Goal</Label>
                <Badge variant="secondary">{{ preferences.dailyGoal }} cards/day</Badge>
              </div>
              <input
                type="range"
                v-model="preferences.dailyGoal"
                min="5"
                max="50"
                step="5"
                class="w-full accent-primary"
              />
              <div class="text-muted-foreground mt-1 flex justify-between text-xs">
                <span>5</span>
                <span>50</span>
              </div>
            </div>

            <!-- Study Reminder -->
            <div class="bg-secondary/50 rounded-xl p-4">
              <div class="mb-3 flex items-center justify-between">
                <Label class="text-foreground text-sm font-medium">Study Reminder</Label>
                <div
                  class="relative h-6 w-11 cursor-pointer rounded-full transition-colors"
                  :class="preferences.reminder ? 'bg-primary' : 'bg-secondary'"
                  @click="preferences.reminder = !preferences.reminder"
                >
                  <div
                    class="bg-primary-foreground absolute top-0.5 h-5 w-5 rounded-full shadow transition-transform"
                    :class="preferences.reminder ? 'left-5.5' : 'left-0.5'"
                  ></div>
                </div>
              </div>
              <p class="text-muted-foreground text-sm">
                {{ preferences.reminder ? 'Reminders enabled at ' + preferences.reminderTime : 'No reminders' }}
              </p>
            </div>

            <!-- Preferred Language -->
            <div class="bg-secondary/50 rounded-xl p-4">
              <Label class="text-foreground mb-2 block text-sm font-medium">Interface Language</Label>
              <select
                v-model="preferences.language"
                class="border-input bg-background text-foreground w-full rounded-lg border px-3 py-2 text-sm"
              >
                <option value="en">English</option>
                <option value="vi">Tiếng Việt</option>
                <option value="ja">日本語</option>
                <option value="ko">한국어</option>
              </select>
            </div>

            <!-- Theme -->
            <div class="bg-secondary/50 rounded-xl p-4">
              <Label class="text-foreground mb-2 block text-sm font-medium">Theme</Label>
              <div class="flex gap-2">
                <button
                  v-for="theme in themes"
                  :key="theme.value"
                  class="flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors"
                  :class="preferences.theme === theme.value ? 'bg-primary text-primary-foreground' : 'bg-background text-foreground hover:bg-secondary'"
                  @click="preferences.theme = theme.value"
                >
                  <component :is="theme.icon" class="h-4 w-4" />
                  {{ theme.label }}
                </button>
              </div>
            </div>
          </div>
        </Card>

        <!-- Danger Zone -->
        <Card class="animate-fade-in-up delay-400 border-destructive/20 bg-destructive/5 rounded-2xl border p-6">
          <h3 class="text-destructive mb-4 flex items-center gap-2 text-lg font-semibold">
            <AlertTriangle class="h-5 w-5" />
            Danger Zone
          </h3>
          <div class="flex flex-wrap gap-3">
            <Button variant="outline" class="border-destructive/30 text-destructive hover:bg-destructive/10">
              <LogOut class="mr-2 h-4 w-4" />
              Sign Out
            </Button>
            <Button variant="outline" class="border-destructive/30 text-destructive hover:bg-destructive/10">
              <Trash2 class="mr-2 h-4 w-4" />
              Delete Account
            </Button>
          </div>
        </Card>
      </div>
    </div>

    <!-- Social Link Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="showSocialModal"
          class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
          @click.self="closeSocialModal"
        >
          <div class="bg-card border-border w-full max-w-md rounded-2xl border p-6 shadow-xl">
            <h3 class="text-foreground mb-4 text-lg font-semibold">
              {{ editingSocialIndex !== null ? 'Edit Social Link' : 'Add Social Link' }}
            </h3>

            <div class="space-y-4">
              <div class="space-y-2">
                <Label class="text-sm font-medium">Platform</Label>
                <select
                  v-model="socialForm.platform"
                  class="border-input bg-background text-foreground w-full rounded-xl border px-4 py-3"
                >
                  <option value="">Select platform</option>
                  <option v-for="platform in socialPlatforms" :key="platform" :value="platform">
                    {{ platform }}
                  </option>
                </select>
              </div>

              <div class="space-y-2">
                <Label class="text-sm font-medium">URL</Label>
                <Input
                  v-model="socialForm.url"
                  placeholder="https://..."
                  class="h-11 rounded-xl"
                />
              </div>
            </div>

            <div class="mt-6 flex gap-3">
              <Button variant="outline" class="flex-1" @click="closeSocialModal">
                Cancel
              </Button>
              <Button class="flex-1" @click="saveSocialLink">
                {{ editingSocialIndex !== null ? 'Update' : 'Add' }}
              </Button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, type Component } from 'vue'
import {
  User,
  Mail,
  Phone,
  MapPin,
  Camera,
  Pencil,
  Check,
  Link2,
  Plus,
  Trash2,
  Trophy,
  FileText,
  Settings,
  LogOut,
  AlertTriangle,
  Code2,
  Briefcase,
  MessageSquare,
  Globe,
  Image,
  Users,
  Play,
  Sun,
  Moon,
  Monitor,
  Star,
  Medal,
  Crown,
  Rocket,
  Zap,
  Target,
} from 'lucide-vue-next'

import Card from '@/components/ui/card/Card.vue'
import Button from '@/components/ui/button/Button.vue'
import Input from '@/components/ui/input/Input.vue'
import Label from '@/components/ui/label/Label.vue'
import Badge from '@/components/ui/badge/Badge.vue'

// Profile data
const profile = reactive({
  avatar: '',
  fullName: 'Alex Johnson',
  username: 'alexj',
  email: 'alex@studyspark.com',
  phone: '+84 123 456 789',
  title: 'Software Developer',
  location: 'Ho Chi Minh City, Vietnam',
  bio: 'Passionate learner and tech enthusiast. Currently focusing on web development and machine learning. Love to share knowledge and help others grow.',
  socialLinks: [
    { platform: 'GitHub', url: 'https://github.com/alexj' },
    { platform: 'LinkedIn', url: 'https://linkedin.com/in/alexj' },
    { platform: 'Twitter', url: 'https://twitter.com/alexj' },
  ],
})

// Stats
const stats = reactive({
  courses: 12,
  streak: 7,
  xp: 2450,
})

// Edit state
const isEditing = ref(false)
const editForm = reactive({
  fullName: '',
  username: '',
  email: '',
  phone: '',
  title: '',
  location: '',
  bio: '',
})

const maxBioLength = 300

// Avatar
const avatarInput = ref<HTMLInputElement | null>(null)

const userInitials = computed(() => {
  if (profile.fullName) {
    return profile.fullName
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }
  return 'U'
})

const openAvatarUpload = () => {
  avatarInput.value?.click()
}

const handleAvatarChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      profile.avatar = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }
}

const changeCover = () => {
  // TODO: Implement cover image change
  console.log('Change cover')
}

// Edit profile
const startEditing = () => {
  editForm.fullName = profile.fullName
  editForm.username = profile.username
  editForm.email = profile.email
  editForm.phone = profile.phone
  editForm.title = profile.title
  editForm.location = profile.location
  editForm.bio = profile.bio
  isEditing.value = true
}

const cancelEditing = () => {
  isEditing.value = false
}

const saveProfile = () => {
  profile.fullName = editForm.fullName
  profile.username = editForm.username
  profile.email = editForm.email
  profile.phone = editForm.phone
  profile.title = editForm.title
  profile.location = editForm.location
  profile.bio = editForm.bio
  isEditing.value = false
}

// Social links
const showSocialModal = ref(false)
const editingSocialIndex = ref<number | null>(null)
const socialForm = reactive({
  platform: '',
  url: '',
})

const socialPlatforms = ['GitHub', 'LinkedIn', 'Twitter', 'Instagram', 'Facebook', 'YouTube', 'Website']

const getSocialIcon = (platform: string): Component => {
  const icons: Record<string, Component> = {
    GitHub: Code2,
    LinkedIn: Briefcase,
    Twitter: MessageSquare,
    Instagram: Image,
    Facebook: Users,
    YouTube: Play,
    Website: Globe,
  }
  return icons[platform] || Globe
}

const addSocialLink = () => {
  socialForm.platform = ''
  socialForm.url = ''
  editingSocialIndex.value = null
  showSocialModal.value = true
}

const editSocialLink = (index: number) => {
  const link = profile.socialLinks[index]
  if (!link) return
  socialForm.platform = link.platform
  socialForm.url = link.url
  editingSocialIndex.value = index
  showSocialModal.value = true
}

const removeSocialLink = (index: number) => {
  profile.socialLinks.splice(index, 1)
}

const saveSocialLink = () => {
  if (!socialForm.platform || !socialForm.url) return

  if (editingSocialIndex.value !== null) {
    profile.socialLinks[editingSocialIndex.value] = {
      platform: socialForm.platform,
      url: socialForm.url,
    }
  } else {
    profile.socialLinks.push({
      platform: socialForm.platform,
      url: socialForm.url,
    })
  }
  closeSocialModal()
}

const closeSocialModal = () => {
  showSocialModal.value = false
  editingSocialIndex.value = null
}

// Achievements
const achievements = [
  { id: 1, name: 'First Steps', icon: Star, earned: true },
  { id: 2, name: 'Quiz Master', icon: Medal, earned: true },
  { id: 3, name: 'Week Warrior', icon: Crown, earned: true },
  { id: 4, name: 'Speed Demon', icon: Rocket, earned: true },
  { id: 5, name: 'Power User', icon: Zap, earned: false },
  { id: 6, name: 'Goal Crusher', icon: Target, earned: false },
]

// Preferences
const preferences = reactive({
  dailyGoal: 20,
  reminder: true,
  reminderTime: '09:00',
  language: 'en',
  theme: 'system',
})

const themes = [
  { value: 'light', label: 'Light', icon: Sun },
  { value: 'dark', label: 'Dark', icon: Moon },
  { value: 'system', label: 'Auto', icon: Monitor },
]
</script>

<style scoped>
/* Social link item animation */
.social-link-item {
  transition: all 0.2s ease;
}

.social-link-item:hover {
  background: var(--secondary);
}

/* Modal animation */
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from > div,
.modal-leave-to > div {
  transform: scale(0.95) translateY(10px);
}

/* Range input styling */
input[type='range'] {
  -webkit-appearance: none;
  height: 6px;
  border-radius: 3px;
  background: var(--secondary);
}

input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: var(--primary);
  cursor: pointer;
  border: 2px solid var(--background);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

input[type='range']::-moz-range-thumb {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: var(--primary);
  cursor: pointer;
  border: 2px solid var(--background);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
