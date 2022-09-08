<script setup>
import { reactive, ref } from 'vue'
import { User, Lock } from '@element-plus/icons-vue'
import { login } from '~/api/manager.js';
import { useRouter } from 'vue-router';  
import {ElNotification} from 'element-plus';
const form = reactive({
  username: "admin",
  password: "admin",
})
const router = useRouter(); 
const rules = {
  account: [
    {
      required: true,
      message: "请输入用户名",
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: "请输入密码",
      trigger: "blur"
    },
  ],
};
const loding = ref(false);
const formRef = ref(null);
const onSubmit = () => {
  loding.value = false
  formRef.value.validate((valid) => {
    if (!valid) {
      return false
    } else {
      login(form.username, form.password).then((res) => {
        ElNotification({
          title: '成功',
          message:'登录成功',
          type: 'success',
          duration:1000
        })
        router.push('/')
        loding.value = true
      }).catch(err => {
        ElNotification({
          title: '警告',
          message: err.response.data.msg || '请求失败',
          type: 'warning',
          duration:1000
        })
      })
    }
  })

}
</script>
<template>
  <div>
    <el-row class="login-container" v-loading="loding">
      <el-col :span=16 class="left">
        <div>
          <div class="left-text-one">欢迎来到得联盟</div>
          <div class="left-text-two">这是一个基于Vite+Vue3+VueRouter4 搭建的一个商城站点系统</div>
        </div>
      </el-col>
      <el-col :span="8" class="right">
        <h2 class="right-text-one">欢迎回来</h2>
        <div class="right-text-two">
          <span class="h-[1px] w-16 bg-gray-200"></span>
          <span>账号密码登录</span>
          <span class="h-[1px] w-16 bg-gray-200"></span>
        </div>
        <el-form :model="form" class="w-[250px]" :rules="rules" ref="formRef">
          <el-form-item prop="username">
            <el-input v-model="form.username" placeholder="请输入用户名" :prefix-icon="User" />
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="form.password" placeholder="请输入密码" :prefix-icon="Lock" show-password />
            <icons>
              <UserFilled />
            </icons>
          </el-form-item>
          <el-form-item>
            <el-button class="w-[250px]" type="primary" @click="onSubmit" round color="#626aef">登录</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>


<style lang="css" scoped>
@import '~/styles/login.css';
</style>

