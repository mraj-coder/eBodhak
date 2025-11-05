import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/courses',
      name: 'courses',
      component: () => import('../views/AboutView.vue'), // Placeholder for now
    },
    {
      path: '/mock-tests',
      name: 'mock-tests',
      component: () => import('../views/AboutView.vue'), // Placeholder for now
    },
    {
      path: '/pricing',
      name: 'pricing',
      component: () => import('../views/AboutView.vue'), // Placeholder for now
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0, behavior: 'smooth' }
    }
  },
})

export default router
