/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router'


const routes = [
  {
    path: '/',
    component: () => import('@/pages/index.vue'),
    children: [
      {
        name: 'overview',
        path: '',
        component: () => import('@/pages/overview/Overview.vue'),
      },
      {
        name: 'channel',
        path: 'channel',
        component: () => import('@/pages/channel/Channel.vue'),
      },
      {
        name: 'apikey',
        path: 'apikey',
        component: () => import('@/pages/apikeys/APIkeys.vue'),
      },
      {
        name: 'logs',
        path: 'logs',
        component: () => import('@/pages/log/Logs.vue'),
      },
      {
        name: 'seting',
        path: 'setting',
        component: () => import('@/pages/setting/Settings.vue'),
      },
      {
        name: 'login',
        path: 'login',
        component: () => import('@/pages/Login.vue'),
      }

    ]
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
