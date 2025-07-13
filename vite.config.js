import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: '/EV4_Frontend/', // 👈 este valor es CLAVE
  plugins: [vue()],
})
