import { createRouter, createWebHistory } from 'vue-router'

import MainLayout from '@/layouts/MainLayout.vue'
import { useAuthStore } from '@/stores/auth.store'

const routes = [
  {
    path: '/',
    redirect: '/vocabulary',
  },
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: 'vocabulary',
        name: 'Vocabulary',
        component: () => import('@/pages/FlashcardsPage.vue'),
        meta: { requiresAuth: false },
      },
      {
        path: 'vocabulary/:id',
        name: 'VocabularyDeck',
        component: () => import('@/pages/FlashcardDeckPage.vue'),
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
