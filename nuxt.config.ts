import { devtools } from "vue";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@pinia/nuxt",
    "@nuxtjs/tailwindcss"
  ],
  devtools:{enabled:true},
  nitro: {
    compressPublicAssets: true,
    compatibilityDate: "2025-05-15"
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE
    }
  }
})
