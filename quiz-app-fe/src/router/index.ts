import { createRouter, createWebHistory } from 'vue-router'

import RegisterPage from '@/pages/RegisterPage.vue'
import ProfilePage from '@/pages/ProfilePage.vue'
import ForgotPasswordPage from '@/pages/ForgotPasswordPage.vue'
import { useAuthStore } from '@/stores/auth.store'
import { AUTH_ROUTES } from './auth.route'

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  ...AUTH_ROUTES,
  {
    path: '/register',
    name: 'Register',
    component: RegisterPage,
    meta: { requiresGuest: true },
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: ForgotPasswordPage,
    meta: { requiresGuest: true },
  },
  {
    path: '/profile',
    name: 'Profile',
    component: ProfilePage,
    meta: { requiresAuth: true },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Navigation guard
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    // Redirect to login if not authenticated
    next('/login')
  } else if (to.meta.requiresGuest && authStore.isAuthenticated) {
    // Redirect to profile if already authenticated
    next('/profile')
  } else {
    next()
  }
})

export default router
