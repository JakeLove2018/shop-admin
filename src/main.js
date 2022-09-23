import { createApp } from 'vue';
import './style.css';
import element from 'element-plus';
import 'virtual:windi.css';
import App from './App.vue';
import {router} from './router/index.js';
import 'element-plus/dist/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import store from './store/index.js';
import 'nprogress/nprogress.css';
import './permission.js';
createApp(App).use(element).use(ElementPlusIconsVue).use(router).use(store).mount('#app');