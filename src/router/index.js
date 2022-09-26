import { createRouter, createWebHashHistory } from 'vue-router';
import {ref} from 'vue'
const routes = [
  {
    path: '/',
    name:'admin',
    component: () => import('~/layouts/admin.vue'),
  },

  {
    path: '/login',
    name: "Login",
    component: () => import('~/pages/Login.vue'),
    meta: {
      title: "登录页面"
    }
  },
  {
    path: '/:pathMatch(.*)',
    name: 'notFound',
    component: () => import('~/pages/404.vue'),
  }
]
// 动态路由，用于匹配菜单动态添加路由
const asyncRoutes = [
  {
    path: '/',
    name: '/',
    component: () => import('~/pages/Home.vue'),
    meta: {
      title: "后台首页"
    }
  },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

// 定义一个动态添加路由的方法
export  function addRoutes(menus) {
  // 是否有新路由
  const hasNewRouter = ref(false);
    const findAndAddRouterByMenus = (arr)=>{
      arr.forEach(e => {
        e.frontpath
        let item = asyncRoutes.find(o => o.path == e.frontpath) ;
        if(item&& router.hasRoute(item.path)){
          router.addRoute( "admin",item)
          hasNewRouter.value = true;
        }
        if(e.child && e.child.length > 0){
          findAndAddRouterByMenus(e.child);
        }
      });
    }
    findAndAddRouterByMenus(menus);
    console.log(router.getRoutes,"所有的路由都有哪些")
    return hasNewRouter;
}