import { createRouter, createWebHistory } from 'vue-router'

import MainLayout from '@/layouts/MainLayout.vue'
import { useAuthStore } from '@/stores/auth.store'

const routes = [
  {
    path: '/',
    redirect: '/quizzes',
  },
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: 'quizzes',
        name: 'Quizzes',
        component: () => import('@/pages/QuizzesPage.vue'),
        meta: { requiresAuth: false },
      },
      {
        path: 'quizzes/multiple-choice',
        name: 'MultipleChoiceQuiz',
        component: () => import('@/pages/quiz/MultipleChoiceQuiz.vue'),
        meta: { requiresAuth: false },
      },
      {
        path: 'quizzes/word-scramble',
        name: 'WordScrambleQuiz',
        component: () => import('@/pages/quiz/WordScrambleQuiz.vue'),
        meta: { requiresAuth: false },
      },
      {
        path: 'quizzes/matching-pairs',
        name: 'MatchingPairsQuiz',
        component: () => import('@/pages/quiz/MatchingPairsQuiz.vue'),
        meta: { requiresAuth: false },
      },
      {
        path: 'quizzes/speed-round',
        name: 'SpeedRoundQuiz',
        component: () => import('@/pages/quiz/SpeedRoundQuiz.vue'),
        meta: { requiresAuth: false },
      },
      {
        path: 'quizzes/true-false',
        name: 'TrueFalseQuiz',
        component: () => import('@/pages/quiz/TrueFalseQuiz.vue'),
        meta: { requiresAuth: false },
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, _from, next) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router
