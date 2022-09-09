import axios from 'axios';
import { tosta } from '~/composables/utils.js';
import {setToken,getToken,removeToken} from '~/composables/auth.js';
const service = axios.create({
  baseURL:"/api"
})
// 添加请求拦截器
service.interceptors.request.use((config)=>{
  // 在发送请求之前做些什么
  const token = getToken('token-admin')
  if(token){
    config.headers['token'] = token;
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
service.interceptors.response.use((res)=>{
  // 对响应数据做点什么
  return res.data.data;
}, (error)=>{
  // 对响应错误做点什么
  tosta('警告', error.msg || '请求失败' , 'waring',1500)
  return Promise.reject(error);
});
export default service;