import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login/index.vue'),
  },
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home/index.vue'),
  },
  {
    path: '/category',
    name: 'category',
    component: () => import('@/views/Category/index.vue'),
  },
  {
    path: '/recommend',
    name: 'recommend',
    component: () => import('@/views/Recommend/index.vue'),
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('@/views/Cart/index.vue'),
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('@/views/User/index.vue'),
  },
]

// 创建 router 实例
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router