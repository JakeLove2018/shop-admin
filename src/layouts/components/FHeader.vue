<script setup>
import { ref,reactive, } from 'vue';
import { Fold, Refresh, FullScreen, Star, Aim } from '@element-plus/icons-vue';
import { showModal, tosta } from '~/composables/utils.js';
import { logout } from '~/api/manager.js';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { useFullscreen } from '@vueuse/core';
import { notUndefined } from '@antfu/utils';
const router = useRouter();
const store = useStore();
const showDrawer = ref(false)
const { isFullscreen/*<是否全屏>*/, toggle } = useFullscreen();
function headerLogout() {
  showModal('是否退出登录').then((res) => {
    logout().finally(() => {
      // 移除cookie里面的token,
      store.dispatch('logout')
      // 清除当前用户状态。
      // 跳转回登录页
      tosta("成功", "退出登录成功")
      router.push('/login');
    })
  }).catch((err) => {

  });
}
function handleCommand(e) {
  console.log(e)
  switch (e) {
    case "logout":
      headerLogout()
      break;

    case "rePassword":
      showDrawer.value = true;
      break;
  }
}
const handleRefresh = () => location.reload()
const form = reactive({
  oldpassword:"",
  password: "",
  repassword:"",

})
const rules = {
  oldpassword: [
    {
      required: true,
      message: "请输入旧密码",
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
  repassword:[
    {
      required:true,
      message:"确认输入密码",
      trigger:"blur",
    }
  ],

};
const loading = ref(false);
const formRef = ref(null);
const onSubmit = () => {
  formRef.value.validate((valid) => {
    if (!valid) {
      return false
    } else {
      loading.value = true
      store.dispatch('login', form).then((res) => {
        tosta('成功', '登陆成功')
        router.push('/')
      }).finally(() => {
        loading.value = false;
      })
    }
  })
}
</script>

<template>
  <div class="f-header">
    <span class="logo">
      <el-icon class="mr-1">
        <Star />
      </el-icon>
      商城系统
    </span>
    <el-icon class="icon-btn">
      <Fold />
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
    <el-drawer v-model="showDrawer" title="修改密码" size="500px" :close-on-click-modal="false">
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
        <el-form-item>
          <el-button type="primary" @click="onSubmit" :loading="loading">提交
          </el-button>
          <el-button type="primary" @click="onSubmit" :loading="loading">取消
          </el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
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
