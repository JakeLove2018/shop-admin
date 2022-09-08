import { createApp } from 'vue'
import './style.css'
import element from 'element-plus';
import 'virtual:windi.css';
import App from './App.vue'
import router from './router/index.js';
createApp(App).use(element).use(router).mount('#app')
