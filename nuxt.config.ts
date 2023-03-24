import eslintPlugin from "vite-plugin-eslint"

export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "@vueuse/nuxt", "@nuxtjs/supabase"],
  vite: {
    plugins: [eslintPlugin()],
  },
})
