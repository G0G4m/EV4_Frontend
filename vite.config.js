import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  base: "/EV4_Frontend/",  // Reemplaza con el nombre de tu repo
  plugins: [vue()],
});
