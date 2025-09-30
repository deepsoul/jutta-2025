import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/kunst',
      name: 'kunst',
      component: () => import('../views/KunstView.vue')
    },
    {
      path: '/schaffen',
      name: 'schaffen',
      component: () => import('../views/SchaffenView.vue')
    },
    {
      path: '/ausstellungen',
      name: 'ausstellungen',
      component: () => import('../views/AusstellungenView.vue')
    },
    {
      path: '/kontakt',
      name: 'kontakt',
      component: () => import('../views/KontaktView.vue')
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

export default router
