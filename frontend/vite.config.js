import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      includeAssets: ['favicon.svg', 'icons.svg', 'spider-man-comic-new-seeklogo.png', 'spidey-coding.png', 'my-photo.jpg'],
      manifest: {
        name: 'Dhodduraaj Portfolio',
        short_name: 'Dhodduraaj',
        description: 'Professional portfolio of Dhodduraaj S P, a Backend and Full-Stack Developer with a Spider-Man theme.',
        theme_color: '#E63946',
        background_color: '#0B1329',
        display: 'standalone',
        start_url: '/',
        orientation: 'any',
        icons: [
          {
            src: '/spider-man-comic-new-seeklogo.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/spider-man-comic-new-seeklogo.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg,gif,webp,woff,woff2}'],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true
      },
      devOptions: {
        enabled: true
      }
    })
  ],
  server: {
    port: 5174,
  }
})

