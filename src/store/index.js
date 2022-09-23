import { createStore } from 'vuex';
import { login, getInfo } from '~/api/manager.js';
import { setToken, getToken, removeToken } from '~/composables/auth.js';
const store = createStore({
  state() {
    return {
      // 用戶信息
      user: {},
      // 侧边宽度
      asideWidte:"250px",
      menus:[],
      ruleNames:[],
    }
  },
  mutations: {
    // 记录用户信息
    SET_USERINFO(state, user) {
      state.user = user;
    },
    // 展开菜单侧边栏
    handleAsideWidthe(state){
      console.log(state)
      state.asideWidte = state.asideWidte == "250px" ? "64px" : "250px"
    },
    SET_MENUS(state,menus){
      state.menus = menus;
    },
    SET_RULWNAMES(state,ruleNames){
      state.ruleNames = ruleNames
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
          console.log(res.menus)
          commit('SET_MENUS',res.menus)
          
          commit('SET_RULWNAMES',res.ruleNames)
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