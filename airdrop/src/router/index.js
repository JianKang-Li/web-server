import { createWebHashHistory, createRouter } from 'vue-router'
import Login from "@/views/Login.vue"
import { useDataStore } from '../store'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: () => {
        return { path: '/file' }
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/file',
      name: 'file',
      component: () => import('../views/File.vue'),
    },
    {
      path: '/text',
      name: 'Text',
      component: () => import('../views/Text.vue'),
    },
    {
      path: '/note',
      name: 'Note',
      component: () => import('../views/Note.vue'),
    },
  ],
})

router.beforeEach((to, from, next) => {
  const store = useDataStore()

  if (!store.user?.name && to.path !== '/login') {
    next('/login')
  } else {
    next()
  }
})


export default router
