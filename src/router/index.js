import {createRouter,createWebHashHistory } from 'vue-router';
const routes = [
  {
    path:'/',
    name:'Index',
    component: () => import('~/pages/Home.vue'),
  },
  {
    path:'/login',
    name:"Login",
    component: () => import('~/pages/Login.vue'),
  },
  {
    path:'/:pathMatch(.*)',
    name:'notFound',
    component: () => import('~/pages/404.vue'),
  }
]
const router = createRouter({
  history:createWebHashHistory(),
  routes,
})

export default router;