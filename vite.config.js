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
  ]
})
