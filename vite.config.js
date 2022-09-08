import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import windicss from 'vite-plugin-windicss';
import path from 'path';
export default defineConfig({
  resolve:{
    alias:{
      "~":path.resolve(__dirname,'src'),
    }
  },
  plugins: [
    vue(),
    windicss()
  ],
  server:{
    proxy:{
      '/api':{
        target:'http://ceshi13.dishait.cn',
        changeOrigin:true,
        rewrite:(path) => path.replace(/^\/api/,'')
      }
    }
  }
})
