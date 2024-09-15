import { createWebHashHistory, createRouter } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'file',
      component: ()=> import('../views/File.vue'),
    },
    {
      path: '/text',
      name: 'Text',
      component: () => import('../views/Text.vue'),
    },
  ],
})

export default router
