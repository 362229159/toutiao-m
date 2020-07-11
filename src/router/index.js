import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  // 使用路由懒加载的方式，导入组件.
  // 导入幕里默认会打开目录下的index.vue
  {
    path: '/',
    name: 'layout',
    component: () => import('@/views/layout'),
    children: [
      { path: '/', name: 'home', component: () => import('@/views/home') },
      { path: '/qa', name: 'qa', component: () => import('@/views/qa') },
      {
        path: '/video',
        name: 'video',
        component: () => import('@/views/video')
      },
      { path: '/my', name: 'my', component: () => import('@/views/my') }
    ]
  },
  { path: '/login', name: 'login', component: () => import('@/views/login') }
]

const router = new VueRouter({
  routes
})

export default router
