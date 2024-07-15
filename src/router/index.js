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
      path: '/bmi',
      name: 'bmi',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/BmiView.vue')
    },
    {
      path: '/dice',
      name: 'dice',
      component: () => import('../views/DiceView.vue')
    },
    {
      path: '/mora',
      name: 'mora',
      component: () => import('../views/MoraView.vue')
    },
    {
      path: '/color-game',
      name: 'color-game',
      component: () => import('../views/ColorgameView.vue')
    },
    {
      path: '/weather',
      name: 'weather',
      component: () => import('../views/WeatherView.vue')
    },
  ]
})

export default router
