// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    redisUrl: process.env.REDIS_URL || '',
    upstashRedisRestUrl: process.env.UPSTASH_REDIS_REST_URL || '',
    upstashRedisRestToken: process.env.UPSTASH_REDIS_REST_TOKEN || '',
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://index.nbtf.ca'
    }
  },
  nitro: {
    preset: 'vercel'
  },
  app: {
    head: {
      title: 'NBTF.CA — Domain Directory & Subdomains',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Official subdomain directory, faction web routing, and contact endpoints for nbtf.ca network.' },
        { name: 'theme-color', content: '#090d16' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Rajdhani:wght@500;600;700&family=Inter:wght@300;400;500;600;700&display=swap' }
      ]
    }
  }
})
