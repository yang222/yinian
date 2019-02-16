import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', redirect:"/login"},
    { path: '/login', component: () => import('@/views/login/index'), hidden: true },
    { path: '/home', component: () => import('@/views/home/index'), hidden: true, redirect: '/newsList',
      children:[
        {
          path: '/newsList', component: () => import('@/views/news/newsList')
        },
        {
          path: '/addNews', component: () => import('@/views/news/addNews')
        },
        {
          path: '/recruitList', component: () => import('@/views/recruit/recruitList')
        },
        {
          path: '/addRecruit', component: () => import('@/views/recruit/addRecruit')
        },
        {
          path: '/password', component: () => import('@/views/pw/password')
        }
      ]
    }
  ]
})
