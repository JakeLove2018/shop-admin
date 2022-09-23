<script setup>
import { Fold, Refresh, FullScreen, Star, Aim,Expand } from '@element-plus/icons-vue';
import { useFullscreen } from '@vueuse/core';
import FormDrawer from '~/components/FormDrawer.vue';
import {useRepassword,useLogout} from '~/composables/useManager.js';
const { isFullscreen/*<是否全屏>*/, toggle } = useFullscreen();
const {
  formRef,
  form,
  rules,
  onSubmit,
  formDrawerRef,
  openRePasswordForm,
} = useRepassword()
const { headerLogout } = useLogout()
const handleRefresh = () => location.reload()
function handleCommand(e) {
  switch (e) {
    case "logout":
      headerLogout()
      break;
    case "rePassword":
      openRePasswordForm()
      break;
  }
}
</script>
<template>
  <div class="f-header">
    <span class="logo">
      <el-icon class="mr-1">
        <Star />
      </el-icon>
      锦鲤商城系统
    </span>
    <el-icon class="icon-btn" @click="$store.commit('handleAsideWidthe')">
      <Fold v-if="$store.state.asideWidte == '250px' "/>
      <Expand v-else />
    </el-icon>
    <el-tooltip effect="dark" content="刷新" placement="bottom">
      <el-icon class="icon-btn" @click="handleRefresh">
        <Refresh />
      </el-icon>
    </el-tooltip>

    <div class="ml-auto flex justify-center items-center">
      <el-tooltip effect="dark" content="全屏" placement="bottom">
        <el-icon class="icon-btn" @click="toggle">
          <FullScreen v-if="!isFullscreen" />
          <Aim v-else />
        </el-icon>
      </el-tooltip>
      <el-dropdown class="dropdown" @command="handleCommand">
        <span class="flex items-center text-light-50">
          <el-avatar :size="25" :src="$store.state.user.avatar" class="mr-5"></el-avatar>
          {{ $store.state.user.username }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="rePassword">修改密码</el-dropdown-item>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>

          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <el-drawer v-model="showDrawer" :close-on-click-modal="false">

    </el-drawer>
    <form-drawer ref="formDrawerRef" title="修改密码" size="45%" @submit="onSubmit" destroyOnClose>
      <el-form :model="form" :rules="rules" ref="formRef" label-width="100px">
        <el-form-item prop="oldpassword" label="旧密码">
          <el-input v-model="form.oldpassword" placeholder="请输入旧密码" />
        </el-form-item>
        <el-form-item prop="password" label="新密码">
          <el-input v-model="form.password" placeholder="请输入密码" show-password />
        </el-form-item>
        <el-form-item prop="repassword" label="确认新密码">
          <el-input v-model="form.repassword" placeholder="请输入确认密码" show-password />
        </el-form-item>
      </el-form>
    </form-drawer>
  </div>
</template>
<style>
.f-header {
  @apply flex items-center bg-indigo-700 text-line-50 fixed top-0 left-0 right-0;
  height: 64px;

}

.logo {
  width: 250px;
  @apply flex justify-center items-center text-xl font-thin;
}

.icon-btn {
  @apply flex justify-center items-center;
  width: 42px;
  height: 64px;
  cursor: pointer;
}

.icon-btn:hover {
  @apply bg-indigo-600;
}

.dropdown {
  height: 64px;
  cursor: pointer @apply flex justify-center items-center mx-5;
}
</style>
