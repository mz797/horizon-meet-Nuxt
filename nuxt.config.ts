export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/image'],
  nitro: {
    preset: 'node-server',
    externals: {
      external: ['@prisma/client'],
    },
    moduleSideEffects: ['@prisma/client'],
  }
})