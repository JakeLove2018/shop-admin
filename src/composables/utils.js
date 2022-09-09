import { ElNotification } from 'element-plus';
// 消息提示的方法
export function tosta(title,message,type,duration= 1000,dangerouslyUseHTMLString = false){
  ElNotification({
    title,
    message,
    type,
    duration,
    dangerouslyUseHTMLString
  })
}