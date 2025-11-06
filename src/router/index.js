import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Roulette from '../components/Roulette.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/roulette',
    name: 'Roulette',
    component: Roulette
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
