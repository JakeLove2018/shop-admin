<script setup>
import { ref,defineExpose } from 'vue';
const showDrawer = ref(false);
const open = ()=>{
  showDrawer.value = true // 打开抽屉
}
const close = ()=>{
  showDrawer.value = false; // 关闭抽屉
}
const a = ref(1)
const props = defineProps({
  title:String,
  size:{
    type:String,
    default:"45%",
  },
  destroyOnClose:{
    type:Boolean,
    default:false,
  },
  confirmText:{
    type:String,
    default:"提交",
  }
})
const emit = defineEmits(['submit'])
//向父组件宝露出一个事件 
const submit = ()=>{
  emit("submit")
}
const loading = ref(false)
const showLoading = ()=>{
  loading.value = true;
}
const hideLoading = ()=> loading.value = false;
// 向父组件导出一项方法
defineExpose({
  open,
  close,
  showLoading,
  hideLoading,
})
</script>

<template>
  <el-drawer v-model="showDrawer" :title="title" :size="size" :close-on-click-modal="false" :destroy-on-close="destroyOnClose">
    <div class="formDrawer">
      <div class="body">
        <slot></slot>
      </div>
      <div class="actions">
        <el-button type="primary" @click="submit" :loading="loading">{{ confirmText }}</el-button>
        <el-button type="default" @click="close">取消</el-button>
      </div>
    </div>
  </el-drawer>
</template>
<style lang="css" scoped >
  .formDrawer{
    width:100%;
    height: 100%;
    @apply flex flex-col;
    position: relative;
  }
  .body{
    flex: 1;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 50px;
    overflow-y:auto;
  }
  .actions{
    height: 50px;
    @apply mt-auto flex items-center;
  }
</style>