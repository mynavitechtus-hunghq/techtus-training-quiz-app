import { createRouter, createWebHistory } from 'vue-router'

import MainLayout from '@/layouts/MainLayout.vue'
import { useAuthStore } from '@/stores/auth.store'

const routes = [
  {
    path: '/',
    redirect: '/courses',
  },
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: 'courses',
        name: 'Courses',
        component: () => import('@/pages/MyCoursesPage.vue'),
        meta: { requiresAuth: false },
      },
      {
        path: 'courses/explore',
        name: 'ExploreCourses',
        component: () => import('@/pages/MyCoursesPage.vue'),
        meta: { requiresAuth: false },
      },
      {
        path: 'courses/:id',
        name: 'CourseDetail',
        component: () => import('@/pages/MyCoursesPage.vue'),
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
