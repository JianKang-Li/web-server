import Vue from 'vue'
import VueRouter from 'vue-router'
import File from '../views/File.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'hash',
  // base: import.meta.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'file',
      component: File
    },
    {
      path: '/text',
      name: 'Text',
      component: () => import('../views/Text.vue')
    }
  ]
})

export default router
