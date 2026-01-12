import { createRouter, createWebHistory } from 'vue-router'

import ProfilePage from '@/pages/ProfilePage.vue'
import { useAuthStore } from '@/stores/auth.store'
import { AUTH_ROUTES } from './auth.route'

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  ...AUTH_ROUTES,
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

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  } else if (to.meta.requiresGuest && authStore.isAuthenticated) {
    next('/profile')
  } else {
    next()
  }
})

export default router
