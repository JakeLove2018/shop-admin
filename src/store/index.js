import { createStore } from 'vuex';
import { login, getInfo } from '~/api/manager.js';
import { setToken, getToken, removeToken } from '~/composables/auth.js';
const store = createStore({
  state() {
    return {
      // 用戶信息
      user: {}
    }
  },
  mutations: {
    // 记录用户信息
    SET_USERINFO(state, user) {
      state.user = user;
    }
  },
  actions: {
    login({ commit }, { username, password }) {
      return new Promise((resolve, reject) => {
        login(username, password).then((res) => {
          setToken(res.token);
          resolve(res)
        }).catch(err => reject(err))
      })
    },
    // 获取当前登陆用户的信息
    getinfo({ commit }) {
      return new Promise((resolve, reject) => {
        getInfo().then((res) => {
          commit('SET_USERINFO', res)
          resolve(res)
        }).catch(err => reject(err))
      })

    },
    // 退出登录
    logout({ commit }) {
      removeToken();
      commit('SET_USERINFO', {})
    }
  }
})
export default store;