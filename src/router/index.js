import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  // 使用路由懒加载的方式，导入组件.
  // 导入幕里默认会打开目录下的index.vue
  {
    path: '/',
    // name: 'layout', // 父路由有默认的子路由，name就没有效果了。
    component: () => import('@/views/layout'),
    children: [
      // '' 默认子路由，只有一个
      { path: '', name: 'home', component: () => import('@/views/home') },
      { path: '/qa', name: 'qa', component: () => import('@/views/qa') },
      {
        path: '/video',
        name: 'video',
        component: () => import('@/views/video')
      },
      { path: '/my', name: 'my', component: () => import('@/views/my') }
    ]
  },
  { path: '/login', name: 'login', component: () => import('@/views/login') },
  { path: '/search', name: 'search', component: () => import('@/views/search') },
  { path: '/article/:articleId', name: 'article', component: () => import('@/views/article'), props: true }
]

const router = new VueRouter({
  routes
})

export default router
