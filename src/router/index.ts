
// Composables
import { createRouter, createWebHistory } from 'vue-router'
import {store} from "../store/store";
import {warn} from "../components/ToastMessage/Message";


const routes = [
  {
    path: '/',
    component: () => import('@/pages/index.vue'),
    children: [
      {
        name: 'overview',
        path: '',
        component: () => import('../pages/overview/index.vue'),
        meta: {
          roles: ['ADMIN', 'USER']
        }
      },
      {
        name: 'channel',
        path: 'channel',
        component: () => import('../pages/channel/index.vue'),
        meta: {
          roles: ['ADMIN', 'USER']
        }
      },
      {
        name: 'apikey',
        path: 'apikey',
        component: () => import('../pages/apikeys/index.vue'),
        meta: {
          roles: ['ADMIN', 'USER']
        }
      },
      {
        name: 'knowledge',
        path: 'knowledge',
        component: () => import('../pages/knowledgeBase/index.vue'),
        meta: {
          roles: ['ADMIN', 'USER'],
          showFather: true
        },
        children: [
          {
            name: 'knowledgeDetail',
            path: ':id',
            props: true,
            component: () => import('@/pages/knowledgeBase/KnowledgeBaseFile.vue'),
            meta: {
              roles: ['ADMIN', 'USER'],
              showFather: false
            }
          }
        ]
      },
      {
        name: 'model',
        path: 'model',
        component: () => import('../pages/model/index.vue'),
        meta: {
          roles: ['ADMIN', 'USER']
        }
      },
      {
        name: 'user',
        path: 'user',
        component: () => import('../pages/user/index.vue'),
        meta: {
          roles: ['ADMIN']
        }
      },
      {
        name: 'logs',
        path: 'logs',
        component: () => import('../pages/log/index.vue'),
        meta: {
          roles: ['ADMIN', 'USER']
        }
      },
      {
        name: 'setting',
        path: 'setting',
        component: () => import('../pages/setting/index.vue'),
        meta: {
          roles: ['ADMIN', 'USER']
        }
      },
    ]
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('@/pages/login/Login.vue'),
    meta: {
      roles: ['ADMIN', 'USER', 'GUEST']
    }
  },
  {
    name: 'logon',
    path: '/logon',
    component: () => import('@/pages/login/Logon.vue'),
    meta: {
      roles:  ['ADMIN', 'USER', 'GUEST']
    }
  },
  {
    name: 'reset',
    path: '/reset',
    component: () => import('@/pages/login/Reset.vue'),
    meta: {
      roles:  ['ADMIN', 'USER', 'GUEST']
    }
  },
  {
    name: 'chat',
    path: '/chat',
    component: () => import('../chatPages/index.vue'),
    meta: {
      roles: ['GUEST']
    },
    children: [
      {
        name: 'chatPage',
        path: '',
        component: () => import('../chatPages/chat/index.vue'),
        meta: {
          roles: ['GUEST']
        }
      }
    ]
  },
  {
    path: '/404',
    name: '404',
    component: () => import('../components/404.vue'),
    meta: {
      roles: ['GUEST']
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    redirect: { name: '404' },
    meta: {
      roles: ['GUEST']
    }
  }
  ]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.onError((error, to) => {
  if (error.message.includes('Failed to fetch dynamically imported module') || error.message.includes("Importing a module script failed")) {
    window.location.href = to.fullPath
  }
})
router.beforeEach((to, from, next) => {

  if (to.meta.roles.includes('GUEST')) {
    next()
  }else if (!store.state.user.token){
    warn('请先登录')
    next({ name: 'login' })
  }
  next()
  // if ((to.name !== 'login' && to.name !== 'logon' )&& !store.state.user.token){
  //   warn('请先登录')
  //   next({ name: 'login' })
  // }else if (to.name === 'login' && store.state.user.token){
  //   warn("您已登录，请先退出登录")
  //   next({ name: 'overview' })
  // }
  // else {
  //
  // }
})

export default router
