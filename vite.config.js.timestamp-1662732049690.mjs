// vite.config.js
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import windicss from "vite-plugin-windicss";
import path from "path";
var __vite_injected_original_dirname = "E:\\\u9879\u76EE\u6587\u4EF6\\shop-admin";
var vite_config_default = defineConfig({
  resolve: {
    alias: {
      "~": path.resolve(__vite_injected_original_dirname, "src")
    }
  },
  plugins: [
    vue(),
    windicss()
  ],
  server: {
    proxy: {
      "/api": {
        target: "http://ceshi13.dishait.cn",
        changeOrigin: true,
        rewrite: (path2) => path2.replace(/^\/api/, "")
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxcdTk4NzlcdTc2RUVcdTY1ODdcdTRFRjZcXFxcc2hvcC1hZG1pblwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRTpcXFxcXHU5ODc5XHU3NkVFXHU2NTg3XHU0RUY2XFxcXHNob3AtYWRtaW5cXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6LyVFOSVBMSVCOSVFNyU5QiVBRSVFNiU5NiU4NyVFNCVCQiVCNi9zaG9wLWFkbWluL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXHJcbmltcG9ydCB3aW5kaWNzcyBmcm9tICd2aXRlLXBsdWdpbi13aW5kaWNzcyc7XHJcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIHJlc29sdmU6e1xyXG4gICAgYWxpYXM6e1xyXG4gICAgICBcIn5cIjpwYXRoLnJlc29sdmUoX19kaXJuYW1lLCdzcmMnKSxcclxuICAgIH1cclxuICB9LFxyXG4gIHBsdWdpbnM6IFtcclxuICAgIHZ1ZSgpLFxyXG4gICAgd2luZGljc3MoKVxyXG4gIF0sXHJcbiAgc2VydmVyOntcclxuICAgIHByb3h5OntcclxuICAgICAgJy9hcGknOntcclxuICAgICAgICB0YXJnZXQ6J2h0dHA6Ly9jZXNoaTEzLmRpc2hhaXQuY24nLFxyXG4gICAgICAgIGNoYW5nZU9yaWdpbjp0cnVlLFxyXG4gICAgICAgIHJld3JpdGU6KHBhdGgpID0+IHBhdGgucmVwbGFjZSgvXlxcL2FwaS8sJycpXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn0pXHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBOFEsU0FBUyxvQkFBb0I7QUFDM1MsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sY0FBYztBQUNyQixPQUFPLFVBQVU7QUFIakIsSUFBTSxtQ0FBbUM7QUFJekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUTtBQUFBLElBQ04sT0FBTTtBQUFBLE1BQ0osS0FBSSxLQUFLLFFBQVEsa0NBQVUsS0FBSztBQUFBLElBQ2xDO0FBQUEsRUFDRjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsSUFBSTtBQUFBLElBQ0osU0FBUztBQUFBLEVBQ1g7QUFBQSxFQUNBLFFBQU87QUFBQSxJQUNMLE9BQU07QUFBQSxNQUNKLFFBQU87QUFBQSxRQUNMLFFBQU87QUFBQSxRQUNQLGNBQWE7QUFBQSxRQUNiLFNBQVEsQ0FBQ0EsVUFBU0EsTUFBSyxRQUFRLFVBQVMsRUFBRTtBQUFBLE1BQzVDO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogWyJwYXRoIl0KfQo=
