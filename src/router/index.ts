import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import checkRouterPermission from '@/utils/checkRouterPermission'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('../views/UsersView.vue'),
      beforeEnter: async (to, from, next) => {
        const routPermission = await checkRouterPermission(to.name as string)
        if (routPermission) {
          next()
        } else {
          next({ name: 'profile' })
        }
      }
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/ProfileView.vue')
    }
  ]
})

export default router
