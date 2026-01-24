import { createRouter, createWebHistory } from 'vue-router'

import MainLayout from '@/layouts/MainLayout.vue'
import ProfilePage from '@/pages/ProfilePage.vue'
import DashboardPage from '@/pages/DashboardPage.vue'
import { useAuthStore } from '@/stores/auth.store'
import { AUTH_ROUTES } from './auth.route'

const routes = [
  {
    path: '/',
    redirect: '/dashboard',
  },
  ...AUTH_ROUTES,
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: DashboardPage,
        meta: { requiresAuth: false },
      },
      {
        path: 'profile',
        name: 'Profile',
        component: ProfilePage,
        meta: { requiresAuth: false },
      },
      {
        path: 'courses',
        name: 'Courses',
        component: () => import('@/pages/ComingSoonPage.vue'),
        meta: { requiresAuth: false },
      },
      {
        path: 'flashcards',
        name: 'Flashcards',
        component: () => import('@/pages/ComingSoonPage.vue'),
        meta: { requiresAuth: false },
      },
      {
        path: 'quizzes',
        name: 'Quizzes',
        component: () => import('@/pages/ComingSoonPage.vue'),
        meta: { requiresAuth: false },
      },
      {
        path: 'goals',
        name: 'Goals',
        component: () => import('@/pages/ComingSoonPage.vue'),
        meta: { requiresAuth: false },
      },
      {
        path: 'achievements',
        name: 'Achievements',
        component: () => import('@/pages/ComingSoonPage.vue'),
        meta: { requiresAuth: false },
      },
      {
        path: 'statistics',
        name: 'Statistics',
        component: () => import('@/pages/ComingSoonPage.vue'),
        meta: { requiresAuth: false },
      },
      {
        path: 'settings',
        name: 'Settings',
        component: () => import('@/pages/ComingSoonPage.vue'),
        meta: { requiresAuth: false },
      },
      {
        path: 'help',
        name: 'Help',
        component: () => import('@/pages/ComingSoonPage.vue'),
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
  } else if (to.meta.requiresGuest && authStore.isAuthenticated) {
    next('/dashboard')
  } else {
    next()
  }
})

export default router
