export const AUTH_ROUTES = [
  {
    path: '/',
    component: () => import('@/layouts/AuthLayout.vue'),
    children: [
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/pages/LoginPage.vue'),
        meta: { requiresGuest: true },
      },
    ],
  },
]
