import {router,addRoutes} from '~/router';
import { getToken } from '~/composables/auth.js';
import { tosta,showFullLoading,hidedFullLoading } from '~/composables/utils.js';
import store from './store';
import {ref} from 'vue'; 

router.beforeEach(async (to, from, next) => {
  showFullLoading()
  const token = getToken();
  // 没有登陆强制跳转登录页
  if (!token && to.path !== '/login') {
    tosta('没有登陆', '请先登陆',)
    return next({ path: '/login' })
  }
  // 重复登陆做判断,登陆过不在重新登陆
  if (token && to.path == '/login') {
    tosta('登陆成功', '请不要重复登陆',)
    return next({ path: from.path ? from.path : '/' })
  }
  // 获取用户登陆就自动获取用户信息,并存储在vuex中,
  let hasNewRouters = ref(false);
  if (token) {
    let {menus} = await store.dispatch('getinfo')
    // 动态添加路由
    hasNewRouters =  addRoutes(menus)
  }
  let title = (to.meta.title ? to.meta.title : '') + '-商城';
  document.title = title;
  hasNewRouters ? next(to.fullpath): next();

});
// 全局后置守卫
router.afterEach((to, from) => {
  hidedFullLoading();
})