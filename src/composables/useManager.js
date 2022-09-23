import { ref, reactive, } from 'vue';
import { upDatePassword } from '~/api/manager.js';
import { showModal, tosta } from '~/composables/utils.js';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { logout } from '~/api/manager.js';
export function useRepassword() {
  const router = useRouter();
  const store = useStore();
  const formDrawerRef = ref(null);
  const form = reactive({
    oldpassword: "",
    password: "",
    repassword: "",
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
    repassword: [
      {
        required: true,
        message: "确认输入密码",
        trigger: "blur",
      }
    ],

  };
  const formRef = ref(null);
  const onSubmit = () => {
    formRef.value.validate((valid) => {
      if (!valid) {
        return false
      } else {
        formDrawerRef.value.showLoading();
        upDatePassword(form).then(() => {
          tosta("成功", "info", "修改密码成功,请重新登录")
          store.dispatch("logout")
          router.push('/login')
        }).finally(() => formDrawerRef.value.hideLoading())
      }
    })
  }
  const openRePasswordForm = () => {
    formDrawerRef.value.open();
  }
  return {
    formRef,
    form,
    rules,
    onSubmit,
    formDrawerRef,
    openRePasswordForm
  }
}
export function useLogout() {
  const router = useRouter();
  const store = useStore();
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
  return {
    headerLogout,
  }
}