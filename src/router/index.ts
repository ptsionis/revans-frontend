import { useAuth } from '@/composables/useAuth'
import LoginView from '@/views/LoginView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      meta: {
        requiersAuth: true,
      },
    },
  ],
})

router.beforeEach(async (to) => {
  const { isAuthenticated, checkAuth } = useAuth()
  await checkAuth()

  if (!isAuthenticated.value && to.name !== 'login') {
    return { name: 'login' }
  }
  if (isAuthenticated.value && to.name === 'login') {
    return { name: 'home' }
  }
})

export default router
