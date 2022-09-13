import router from '~/router';
import { getToken } from '~/composables/auth.js';
import { tosta,showFullLoading,hidedFullLoading } from '~/composables/utils.js';
import store from './store';

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
  if (token) {
    await store.dispatch('getinfo')
  }
  console.log(to.meta.title)
  let title = (to.meta.title ? to.meta.title : '') + '-商城';
  document.title = title;
  next();
});
// 全局后置守卫
router.afterEach((to, from) => {
  hidedFullLoading();
})