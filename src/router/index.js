import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/PlayerMobile.vue')
  },
  {
    path: '/config',
    name: 'Config',
    component: () => import('../views/PlayerConfig.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 