import { ElNotification,ElMessageBox } from 'element-plus';
import nprogress from 'nprogress';
// 消息提示的方法
export function tosta(title,message,type,duration= 1000,dangerouslyUseHTMLString = false){
  ElNotification({
    title,
    message,
    type,
    duration,
    dangerouslyUseHTMLString
  })
};

export function showModal(content="提示类容",type="warning",title=""){
  return ElMessageBox.confirm(
    content,
    title,
    {
      confirmButtonText:'确认',
      cancelButtonText:'取消',
      type,
    }
  )
}
// 显示全屏loding
export function showFullLoading(){
  nprogress.start();
}
// 隐藏全局loading
export function hidedFullLoading(){
  nprogress.done();
  
}