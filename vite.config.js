import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [react()],
  resolve: {
    //配置文件扩展名
    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json"],
  }
})
