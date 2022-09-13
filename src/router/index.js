import {createRouter,createWebHashHistory } from 'vue-router';
const routes = [
  {
    path:'/',
    component: ()=> import('~/layouts/admin.vue'),
    children:[
      {
        path:'/',
        name:'Index',
        component: () => import('~/pages/Home.vue'),
        meta:{
          title:"后台首页"
        }
      },
    ]
  },
  
  {
    path:'/login',
    name:"Login",
    component: () => import('~/pages/Login.vue'),
    meta:{
      title:"登录页面"
    }
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