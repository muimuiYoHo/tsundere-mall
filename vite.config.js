// 从 vite 引入配置方法
import { defineConfig } from 'vite'

// 引入 Vue 插件（支持 Vue 单文件组件）
import vue from '@vitejs/plugin-vue'

// 引入 Tailwind CSS 插件（方便使用原子化 CSS）
import tailwindcss from '@tailwindcss/vite'

// Vite 配置文件导出
// defineConfig 用来提供更好的类型提示和自动补全
export default defineConfig({
  plugins: [
    vue(),        // 启用 Vue 插件
    tailwindcss() // 启用 Tailwind CSS 插件
  ],
  base: '/tsundere-mall/' ,     // 设置打包后文件的路径
})
