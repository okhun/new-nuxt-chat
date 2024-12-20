import Aura from "@primevue/themes/aura";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: ["@pinia/nuxt", "@primevue/nuxt-module"],

  primevue: {
    options: {
      theme: {
        preset: Aura,
      },
    },
  },
  router: {
    middleware: ["auth"],
  },
  css: ["@/assets/css/tailwind.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  plugins: ["~/plugins/fetch-interceptor.ts", "@/plugins/antd"], // Register the plugin
  // http: {
  //   baseURL: 'http://34.239.114.61:5000', // Your API base URL
  // },
});
