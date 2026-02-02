import { createRouter, createWebHistory } from 'vue-router'

import { useAuthStore } from '@/stores/auth.store'
import { AUTH_ROUTES } from './auth.route'

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  ...AUTH_ROUTES,
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
    next('/')
  } else {
    next()
  }
})

export default router
