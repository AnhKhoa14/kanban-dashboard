import type { RouterConfig } from '@nuxt/schema'

export default {
  routes: _routes => [
    {
      name: 'home',
      path: '/',
      component: () => import('~/pages/index.vue'),
    },
    {
      name: 'sign-in',
      path: '/auth/sign-in',
      component: () => import('~/pages/auth/signin/index.vue'),
    },
    {
      name: 'sign-up',
      path: '/auth/sign-up',
      component: () => import('~/pages/auth/signup/index.vue'),
    },
    {
      name: 'dashboard',
      path: '/dashboard',
      component: () => import('~/pages/dashboard/index.vue'),
    }
    
  ],
} satisfies RouterConfig
