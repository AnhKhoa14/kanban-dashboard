// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
import vuetify from "vite-plugin-vuetify";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  // ssr: false,
  devtools: { enabled: true },
  css: [
    './assets/css/main.css',
    '@mdi/font/css/materialdesignicons.css',
    'vuetify/styles',
  ],
  vite: {
    plugins: [tailwindcss(), vuetify({ autoImport: true })],
  },
  build: {
    transpile: ["vuetify"],
  },
});
