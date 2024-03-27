import eslintPlugin from "vite-plugin-eslint"

export default defineNuxtConfig({
  runtimeConfig: {
    stripeSecret: "",
    stripeWebhookSecret: "",
    public: {
      stripeKey: "",
    },
  },
  nitro: {
    prerender: {
      routes: ["/landing"],
    },
  },
  modules: ["@nuxtjs/tailwindcss", "@vueuse/nuxt", "@nuxtjs/supabase", "@pinia/nuxt", "@nuxt/image"],
  image: {
    quality: 80,
  },
  vite: {
    plugins: [eslintPlugin()],
  },
})
