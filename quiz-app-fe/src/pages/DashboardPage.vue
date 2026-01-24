<template>
  <div class="p-6 lg:p-8">
    <!-- Welcome Section -->
    <div class="animate-fade-in-down mb-8">
      <h1 class="text-foreground text-2xl font-bold tracking-tight lg:text-3xl">
        Welcome back, {{ userName }}!
      </h1>
      <p class="text-muted-foreground mt-2 text-base">Ready to continue your learning journey?</p>
    </div>

    <!-- Stats Row -->
    <div class="animate-fade-in-up delay-100 mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
      <!-- Streak Counter -->
      <div class="bg-card border-border group rounded-2xl border p-4 transition-all duration-300 hover:shadow-lg lg:p-5">
        <div class="mb-3 flex items-center gap-3">
          <div class="bg-primary/10 flex h-11 w-11 items-center justify-center rounded-xl lg:h-12 lg:w-12">
            <Flame class="text-primary h-5 w-5 lg:h-6 lg:w-6" />
          </div>
        </div>
        <span class="text-foreground text-2xl font-bold lg:text-3xl">{{ streak }}</span>
        <p class="text-muted-foreground mt-1 text-sm">Day Streak</p>
      </div>

      <!-- Cards Learned -->
      <div class="bg-card border-border group rounded-2xl border p-4 transition-all duration-300 hover:shadow-lg lg:p-5">
        <div class="mb-3 flex items-center gap-3">
          <div class="bg-primary/10 flex h-11 w-11 items-center justify-center rounded-xl lg:h-12 lg:w-12">
            <BookOpen class="text-primary h-5 w-5 lg:h-6 lg:w-6" />
          </div>
        </div>
        <span class="text-foreground text-2xl font-bold lg:text-3xl">{{ cardsLearned }}</span>
        <p class="text-muted-foreground mt-1 text-sm">Cards Learned</p>
      </div>

      <!-- Quizzes Completed -->
      <div class="bg-card border-border group rounded-2xl border p-4 transition-all duration-300 hover:shadow-lg lg:p-5">
        <div class="mb-3 flex items-center gap-3">
          <div class="bg-primary/10 flex h-11 w-11 items-center justify-center rounded-xl lg:h-12 lg:w-12">
            <Trophy class="text-primary h-5 w-5 lg:h-6 lg:w-6" />
          </div>
        </div>
        <span class="text-foreground text-2xl font-bold lg:text-3xl">{{ quizzesCompleted }}</span>
        <p class="text-muted-foreground mt-1 text-sm">Quizzes Done</p>
      </div>

      <!-- Total XP -->
      <div class="bg-card border-border group rounded-2xl border p-4 transition-all duration-300 hover:shadow-lg lg:p-5">
        <div class="mb-3 flex items-center gap-3">
          <div class="bg-primary/10 flex h-11 w-11 items-center justify-center rounded-xl lg:h-12 lg:w-12">
            <Zap class="text-primary h-5 w-5 lg:h-6 lg:w-6" />
          </div>
        </div>
        <span class="text-foreground text-2xl font-bold lg:text-3xl">{{ totalXP }}</span>
        <p class="text-muted-foreground mt-1 text-sm">Total XP</p>
      </div>
    </div>

    <!-- Main Grid -->
    <div class="grid grid-cols-1 gap-6 xl:grid-cols-3 xl:gap-8">
      <!-- Left Column -->
      <div class="space-y-6 xl:col-span-2 xl:space-y-8">
        <!-- Today's Goal -->
        <Card class="animate-fade-in-up delay-150 bg-card border-border rounded-2xl border p-5 lg:p-6">
          <div class="mb-4 flex items-center justify-between lg:mb-5">
            <h2 class="text-foreground flex items-center gap-3 text-base font-semibold lg:text-lg">
              <Target class="text-primary h-5 w-5" />
              Today's Goal
            </h2>
            <span class="text-primary text-sm font-medium">{{ todayProgress }}/{{ todayGoal }} cards</span>
          </div>
          <div class="space-y-3 lg:space-y-4">
            <Progress :model-value="todayProgressPercent" class="h-2.5 lg:h-3" />
            <div class="flex items-center justify-between">
              <p class="text-muted-foreground text-sm">
                {{ todayProgressPercent >= 100 ? 'Goal completed!' : `${Math.round(100 - todayProgressPercent)}% remaining` }}
              </p>
              <div v-if="todayProgressPercent >= 100" class="text-primary flex items-center gap-1.5">
                <CheckCircle class="h-4 w-4" />
                <span class="text-sm font-medium">Done!</span>
              </div>
            </div>
          </div>
        </Card>

        <!-- Continue Learning -->
        <Card class="animate-fade-in-up delay-200 bg-card border-border rounded-2xl border p-5 lg:p-6">
          <div class="mb-4 flex items-center justify-between lg:mb-5">
            <h2 class="text-foreground flex items-center gap-3 text-base font-semibold lg:text-lg">
              <PlayCircle class="text-primary h-5 w-5" />
              Continue Learning
            </h2>
            <Button variant="ghost" size="sm" class="text-primary">
              View All
              <ChevronRight class="ml-1 h-4 w-4" />
            </Button>
          </div>
          <div class="space-y-3 lg:space-y-4">
            <template v-if="isLoading">
              <div v-for="i in 3" :key="i" class="bg-secondary/50 rounded-xl p-4">
                <div class="flex items-center gap-4">
                  <div class="skeleton h-12 w-12 rounded-xl"></div>
                  <div class="flex-1 space-y-2">
                    <div class="skeleton h-4 w-3/4 rounded"></div>
                    <div class="skeleton h-2 w-1/2 rounded"></div>
                  </div>
                </div>
              </div>
            </template>
            <template v-else>
              <div
                v-for="(course, index) in continueLearning"
                :key="course.id"
                class="course-card bg-secondary/50 hover:bg-secondary group cursor-pointer rounded-xl p-4 transition-all duration-300"
                :style="{ animationDelay: `${index * 100}ms` }"
              >
                <div class="flex items-center gap-4">
                  <div class="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105">
                    <component :is="course.icon" class="text-primary h-6 w-6" />
                  </div>
                  <div class="min-w-0 flex-1">
                    <h3 class="text-foreground truncate font-medium">{{ course.title }}</h3>
                    <div class="mt-2 flex items-center gap-3">
                      <Progress :model-value="course.progress" class="h-1.5 flex-1" />
                      <span class="text-muted-foreground text-xs font-medium">{{ course.progress }}%</span>
                    </div>
                  </div>
                  <ChevronRight class="text-muted-foreground h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </template>
          </div>
        </Card>

        <!-- Recent Flashcards -->
        <Card class="animate-fade-in-up delay-300 bg-card border-border rounded-2xl border p-5 lg:p-6">
          <div class="mb-4 flex items-center justify-between lg:mb-5">
            <h2 class="text-foreground flex items-center gap-3 text-base font-semibold lg:text-lg">
              <Layers class="text-primary h-5 w-5" />
              Recent Flashcards
            </h2>
            <Button variant="ghost" size="sm" class="text-primary">
              View All
              <ChevronRight class="ml-1 h-4 w-4" />
            </Button>
          </div>
          <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:gap-4">
            <template v-if="isLoading">
              <div v-for="i in 4" :key="i" class="bg-secondary/50 rounded-xl p-4">
                <div class="skeleton mb-3 h-4 w-3/4 rounded"></div>
                <div class="skeleton h-3 w-1/2 rounded"></div>
              </div>
            </template>
            <template v-else>
              <div
                v-for="(flashcard, index) in recentFlashcards"
                :key="flashcard.id"
                class="flashcard-item bg-secondary/50 hover:bg-secondary group cursor-pointer rounded-xl p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                :style="{ animationDelay: `${index * 75}ms` }"
              >
                <div class="mb-3 flex items-start justify-between gap-3">
                  <span class="text-foreground line-clamp-2 text-sm font-medium">{{ flashcard.question }}</span>
                  <Badge variant="secondary" class="shrink-0 text-xs">
                    {{ flashcard.difficulty }}
                  </Badge>
                </div>
                <div class="text-muted-foreground flex items-center gap-2 text-xs">
                  <Clock class="h-3.5 w-3.5" />
                  <span>{{ flashcard.lastStudied }}</span>
                </div>
              </div>
            </template>
          </div>
        </Card>
      </div>

      <!-- Right Column -->
      <div class="space-y-6 xl:space-y-8">
        <!-- Study Modes -->
        <Card class="animate-fade-in-up delay-200 bg-card border-border rounded-2xl border p-5 lg:p-6">
          <h2 class="text-foreground mb-4 flex items-center gap-3 text-base font-semibold lg:mb-5 lg:text-lg">
            <Gamepad2 class="text-primary h-5 w-5" />
            Study Modes
          </h2>
          <div class="space-y-3">
            <button
              v-for="(mode, index) in studyModes"
              :key="mode.id"
              class="study-mode-btn bg-secondary/50 hover:bg-secondary group flex w-full items-center gap-4 rounded-xl p-3.5 transition-all duration-300 lg:p-4"
              :style="{ animationDelay: `${index * 100}ms` }"
            >
              <div class="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105 lg:h-11 lg:w-11">
                <component :is="mode.icon" class="text-primary h-5 w-5" />
              </div>
              <div class="flex-1 text-left">
                <h3 class="text-foreground font-medium">{{ mode.title }}</h3>
                <p class="text-muted-foreground text-xs">{{ mode.description }}</p>
              </div>
              <ArrowRight class="text-muted-foreground h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </Card>

        <!-- Weekly Activity -->
        <Card class="animate-fade-in-up delay-300 bg-card border-border rounded-2xl border p-5 lg:p-6">
          <h2 class="text-foreground mb-4 flex items-center gap-3 text-base font-semibold lg:mb-5 lg:text-lg">
            <BarChart3 class="text-primary h-5 w-5" />
            Weekly Activity
          </h2>
          <div class="flex items-end justify-between gap-2 lg:gap-3">
            <div
              v-for="(day, index) in weeklyActivity"
              :key="day.name"
              class="activity-bar flex flex-1 flex-col items-center gap-2 lg:gap-3"
              :style="{ animationDelay: `${index * 50}ms` }"
            >
              <div class="bg-secondary relative h-24 w-full overflow-hidden rounded-lg lg:h-28">
                <div
                  class="bg-primary absolute bottom-0 left-0 w-full rounded-lg transition-all duration-500"
                  :style="{ height: `${day.percent}%` }"
                ></div>
              </div>
              <span class="text-muted-foreground text-xs font-medium">{{ day.name }}</span>
            </div>
          </div>
        </Card>

        <!-- Achievements -->
        <Card class="animate-fade-in-up delay-400 bg-card border-border rounded-2xl border p-5 lg:p-6">
          <h2 class="text-foreground mb-4 flex items-center gap-3 text-base font-semibold lg:mb-5 lg:text-lg">
            <Award class="text-primary h-5 w-5" />
            Recent Badges
          </h2>
          <div class="flex flex-wrap gap-3 lg:gap-4">
            <div
              v-for="(badge, index) in recentBadges"
              :key="badge.id"
              class="badge-item group relative"
              :style="{ animationDelay: `${index * 100}ms` }"
            >
              <div class="bg-primary/10 flex h-12 w-12 cursor-pointer items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/20 lg:h-14 lg:w-14">
                <component :is="badge.icon" class="text-primary h-5 w-5 lg:h-6 lg:w-6" />
              </div>
              <div class="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span class="bg-foreground text-background rounded px-2 py-1 text-xs font-medium">{{ badge.name }}</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, type Component } from 'vue'
import {
  Flame,
  BookOpen,
  Trophy,
  Zap,
  Target,
  PlayCircle,
  ChevronRight,
  Layers,
  Clock,
  Gamepad2,
  ArrowRight,
  BarChart3,
  Award,
  CheckCircle,
  Brain,
  Timer,
  Shuffle,
  Star,
  Medal,
  Crown,
  Rocket,
  Code,
  Languages,
  Calculator,
} from 'lucide-vue-next'

import Button from '@/components/ui/button/Button.vue'
import Card from '@/components/ui/card/Card.vue'
import Progress from '@/components/ui/progress/Progress.vue'
import Badge from '@/components/ui/badge/Badge.vue'

// User data
const userName = ref('Alex')

// Stats
const streak = ref(7)
const cardsLearned = ref(156)
const quizzesCompleted = ref(23)
const totalXP = ref(2450)

// Today's goal
const todayProgress = ref(15)
const todayGoal = ref(20)
const todayProgressPercent = computed(() => Math.min((todayProgress.value / todayGoal.value) * 100, 100))

// Loading state
const isLoading = ref(true)

// Continue Learning data
interface Course {
  id: number
  title: string
  progress: number
  icon: Component
}

const continueLearning = ref<Course[]>([
  { id: 1, title: 'JavaScript Fundamentals', progress: 68, icon: Code },
  { id: 2, title: 'Spanish Vocabulary', progress: 45, icon: Languages },
  { id: 3, title: 'Advanced Mathematics', progress: 32, icon: Calculator },
])

// Recent Flashcards
interface Flashcard {
  id: number
  question: string
  difficulty: string
  lastStudied: string
}

const recentFlashcards = ref<Flashcard[]>([
  { id: 1, question: 'What is a closure in JavaScript?', difficulty: 'Medium', lastStudied: '2 hours ago' },
  { id: 2, question: 'Explain the difference between let and const', difficulty: 'Easy', lastStudied: '5 hours ago' },
  { id: 3, question: 'What is the event loop?', difficulty: 'Hard', lastStudied: '1 day ago' },
  { id: 4, question: 'How does prototypal inheritance work?', difficulty: 'Medium', lastStudied: '2 days ago' },
])

// Study Modes
interface StudyMode {
  id: number
  title: string
  description: string
  icon: Component
}

const studyModes = ref<StudyMode[]>([
  { id: 1, title: 'Flashcards', description: 'Classic study mode', icon: Layers },
  { id: 2, title: 'Quiz Mode', description: 'Test your knowledge', icon: Brain },
  { id: 3, title: 'Speed Round', description: 'Race against time', icon: Timer },
  { id: 4, title: 'Shuffle', description: 'Random practice', icon: Shuffle },
])

// Weekly Activity
interface DayActivity {
  name: string
  percent: number
}

const weeklyActivity = ref<DayActivity[]>([
  { name: 'M', percent: 60 },
  { name: 'T', percent: 80 },
  { name: 'W', percent: 45 },
  { name: 'T', percent: 90 },
  { name: 'F', percent: 70 },
  { name: 'S', percent: 30 },
  { name: 'S', percent: 55 },
])

// Recent Badges
interface BadgeItem {
  id: number
  name: string
  icon: Component
}

const recentBadges = ref<BadgeItem[]>([
  { id: 1, name: 'First Steps', icon: Star },
  { id: 2, name: 'Quiz Master', icon: Medal },
  { id: 3, name: 'Week Warrior', icon: Crown },
  { id: 4, name: 'Speed Demon', icon: Rocket },
])

// Simulate loading
onMounted(() => {
  setTimeout(() => {
    isLoading.value = false
  }, 800)
})
</script>

<style scoped>
/* Skeleton loading */
.skeleton {
  background: linear-gradient(
    90deg,
    var(--muted) 25%,
    var(--secondary) 50%,
    var(--muted) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

/* Course card */
.course-card {
  animation: fadeInUp 0.5s ease-out forwards;
  opacity: 0;
}

/* Flashcard item */
.flashcard-item {
  animation: fadeInUp 0.4s ease-out forwards;
  opacity: 0;
}

/* Study mode button */
.study-mode-btn {
  animation: slideInRight 0.4s ease-out forwards;
  opacity: 0;
}

/* Activity bar */
.activity-bar {
  animation: growUp 0.6s ease-out forwards;
}

@keyframes growUp {
  from {
    opacity: 0;
    transform: scaleY(0);
  }
  to {
    opacity: 1;
    transform: scaleY(1);
  }
}

/* Badge item */
.badge-item {
  animation: popIn 0.4s ease-out forwards;
  opacity: 0;
}

@keyframes popIn {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Keyframes */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(15px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
