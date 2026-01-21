<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import {
  Flame,
  BookOpen,
  Brain,
  Zap,
  Clock,
  Target,
  ChevronRight,
  Layers,
  PenTool,
  Headphones,
  Gamepad2,
} from 'lucide-vue-next'
import Card from '@/components/ui/card/Card.vue'
import CardContent from '@/components/ui/card/CardContent.vue'
import CardHeader from '@/components/ui/card/CardHeader.vue'
import CardTitle from '@/components/ui/card/CardTitle.vue'
import { Progress } from '@/components/ui/progress'
import Button from '@/components/ui/button/Button.vue'

// Mock data - replace with real API data
const streak = ref(7)
const todayGoal = ref({
  current: 15,
  target: 20,
  label: 'cards studied',
})

const continueLearning = ref([
  {
    id: 1,
    title: 'JavaScript Fundamentals',
    progress: 65,
    cardsLeft: 12,
    lastStudied: '2 hours ago',
  },
  {
    id: 2,
    title: 'React Hooks Deep Dive',
    progress: 30,
    cardsLeft: 28,
    lastStudied: 'Yesterday',
  },
  {
    id: 3,
    title: 'TypeScript Essentials',
    progress: 85,
    cardsLeft: 5,
    lastStudied: '3 days ago',
  },
])

const recentFlashcards = ref([
  { id: 1, front: 'What is a closure?', deck: 'JavaScript', mastered: true },
  { id: 2, front: 'Explain useEffect', deck: 'React', mastered: false },
  { id: 3, front: 'What is a Promise?', deck: 'JavaScript', mastered: true },
  { id: 4, front: 'Type vs Interface', deck: 'TypeScript', mastered: false },
])

const studyModes = ref([
  {
    id: 'flashcards',
    name: 'Flashcards',
    icon: Layers,
    description: 'Classic flip cards',
  },
  { id: 'write', name: 'Write', icon: PenTool, description: 'Type your answers' },
  { id: 'listen', name: 'Listen', icon: Headphones, description: 'Audio learning' },
  { id: 'match', name: 'Match', icon: Gamepad2, description: 'Memory game' },
])

const goalPercentage = computed(() =>
  Math.round((todayGoal.value.current / todayGoal.value.target) * 100)
)

// Animation state
const showContent = ref(false)

onMounted(() => {
  setTimeout(() => {
    showContent.value = true
  }, 100)
})

const getGreeting = () => {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 18) return 'Good afternoon'
  return 'Good evening'
}
</script>

<template>
  <div class="bg-background min-h-screen">
    <div class="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <!-- Header Section -->
      <div class="animate-fade-in-down mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 class="text-3xl font-bold tracking-tight sm:text-4xl">
            {{ getGreeting() }}! 👋
          </h1>
          <p class="text-muted-foreground mt-1">Ready to continue your learning journey?</p>
        </div>

        <!-- Streak Counter -->
        <Card
          class="card-interactive animate-scale-in border-2 px-6 py-4"
        >
          <div class="flex items-center gap-3">
            <div class="animate-streak-fire">
              <Flame class="h-8 w-8 text-orange-500" />
            </div>
            <div>
              <p class="text-2xl font-bold">{{ streak }}</p>
              <p class="text-muted-foreground text-sm">day streak</p>
            </div>
          </div>
        </Card>
      </div>

      <div class="grid gap-6 lg:grid-cols-3">
        <!-- Main Content Column -->
        <div class="space-y-6 lg:col-span-2">
          <!-- Today's Goal Progress -->
          <Card class="card-interactive animate-slide-in-bottom stagger-1 overflow-hidden">
            <CardHeader class="pb-3">
              <div class="flex items-center justify-between">
                <CardTitle class="flex items-center gap-2">
                  <Target class="h-5 w-5" />
                  Today's Goal
                </CardTitle>
                <span class="text-muted-foreground text-sm">
                  {{ todayGoal.current }}/{{ todayGoal.target }} {{ todayGoal.label }}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div class="space-y-3">
                <div class="relative">
                  <Progress
                    :model-value="goalPercentage"
                    class="h-3"
                    indicator-class="animate-progress-fill"
                  />
                </div>
                <div class="flex items-center justify-between">
                  <p class="text-muted-foreground text-sm">
                    <span v-if="goalPercentage >= 100" class="text-foreground font-medium">
                      🎉 Goal completed!
                    </span>
                    <span v-else>
                      {{ todayGoal.target - todayGoal.current }} more to reach your goal
                    </span>
                  </p>
                  <span class="animate-count-up delay-300 text-lg font-semibold">
                    {{ goalPercentage }}%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <!-- Continue Learning Section -->
          <Card class="animate-slide-in-bottom stagger-2">
            <CardHeader>
              <div class="flex items-center justify-between">
                <CardTitle class="flex items-center gap-2">
                  <BookOpen class="h-5 w-5" />
                  Continue Learning
                </CardTitle>
                <Button variant="ghost" size="sm" class="gap-1">
                  View all
                  <ChevronRight class="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent class="space-y-4">
              <div
                v-for="(deck, index) in continueLearning"
                :key="deck.id"
                class="card-interactive hover:bg-muted/50 group cursor-pointer rounded-xl border p-4 transition-colors"
                :class="`stagger-${index + 1}`"
              >
                <div class="flex items-center justify-between">
                  <div class="flex-1">
                    <h3 class="font-semibold group-hover:underline">{{ deck.title }}</h3>
                    <div class="text-muted-foreground mt-1 flex items-center gap-3 text-sm">
                      <span class="flex items-center gap-1">
                        <Clock class="h-3.5 w-3.5" />
                        {{ deck.lastStudied }}
                      </span>
                      <span>{{ deck.cardsLeft }} cards left</span>
                    </div>
                  </div>
                  <div class="flex items-center gap-4">
                    <div class="text-right">
                      <span class="text-sm font-medium">{{ deck.progress }}%</span>
                    </div>
                    <ChevronRight
                      class="text-muted-foreground h-5 w-5 transition-transform group-hover:translate-x-1"
                    />
                  </div>
                </div>
                <Progress :model-value="deck.progress" class="mt-3 h-1.5" />
              </div>
            </CardContent>
          </Card>

          <!-- Recent Flashcards -->
          <Card class="animate-slide-in-bottom stagger-3">
            <CardHeader>
              <div class="flex items-center justify-between">
                <CardTitle class="flex items-center gap-2">
                  <Brain class="h-5 w-5" />
                  Recent Flashcards
                </CardTitle>
                <Button variant="ghost" size="sm" class="gap-1">
                  Review all
                  <ChevronRight class="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div class="grid gap-3 sm:grid-cols-2">
                <div
                  v-for="card in recentFlashcards"
                  :key="card.id"
                  class="card-interactive hover:bg-muted/50 group cursor-pointer rounded-xl border p-4 transition-colors"
                >
                  <div class="mb-2 flex items-start justify-between">
                    <span class="bg-secondary text-secondary-foreground rounded-md px-2 py-0.5 text-xs font-medium">
                      {{ card.deck }}
                    </span>
                    <span
                      v-if="card.mastered"
                      class="text-xs"
                      title="Mastered"
                    >
                      ✓
                    </span>
                  </div>
                  <p class="line-clamp-2 text-sm font-medium">{{ card.front }}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <!-- Sidebar Column -->
        <div class="space-y-6">
          <!-- Quick Stats -->
          <Card class="animate-slide-in-bottom stagger-2">
            <CardHeader class="pb-3">
              <CardTitle class="flex items-center gap-2 text-base">
                <Zap class="h-5 w-5" />
                Quick Stats
              </CardTitle>
            </CardHeader>
            <CardContent class="grid grid-cols-2 gap-4">
              <div class="bg-muted/50 rounded-xl p-4 text-center">
                <p class="animate-count-up text-2xl font-bold">247</p>
                <p class="text-muted-foreground text-xs">Cards Mastered</p>
              </div>
              <div class="bg-muted/50 rounded-xl p-4 text-center">
                <p class="animate-count-up delay-100 text-2xl font-bold">12</p>
                <p class="text-muted-foreground text-xs">Decks Created</p>
              </div>
              <div class="bg-muted/50 rounded-xl p-4 text-center">
                <p class="animate-count-up delay-200 text-2xl font-bold">89%</p>
                <p class="text-muted-foreground text-xs">Accuracy</p>
              </div>
              <div class="bg-muted/50 rounded-xl p-4 text-center">
                <p class="animate-count-up delay-300 text-2xl font-bold">4.2h</p>
                <p class="text-muted-foreground text-xs">This Week</p>
              </div>
            </CardContent>
          </Card>

          <!-- Study Modes Shortcuts -->
          <Card class="animate-slide-in-bottom stagger-3">
            <CardHeader class="pb-3">
              <CardTitle class="text-base">Study Modes</CardTitle>
            </CardHeader>
            <CardContent class="grid grid-cols-2 gap-3">
              <button
                v-for="mode in studyModes"
                :key="mode.id"
                class="card-interactive hover:bg-muted/50 flex flex-col items-center gap-2 rounded-xl border p-4 transition-colors"
              >
                <div class="icon-bounce bg-muted rounded-lg p-2">
                  <component :is="mode.icon" class="h-5 w-5" />
                </div>
                <span class="text-sm font-medium">{{ mode.name }}</span>
              </button>
            </CardContent>
          </Card>

          <!-- Start Learning CTA -->
          <Card class="animate-slide-in-bottom stagger-4 border-2">
            <CardContent class="p-6 text-center">
              <div class="animate-float-slow mb-4">
                <BookOpen class="text-muted-foreground mx-auto h-12 w-12" />
              </div>
              <h3 class="mb-2 font-semibold">Ready to learn?</h3>
              <p class="text-muted-foreground mb-4 text-sm">
                Pick up where you left off or start something new.
              </p>
              <Button class="w-full">Start Studying</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>