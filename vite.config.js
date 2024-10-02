import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: [
        "favicon.svg",
        "favicon.ico",
        "robots.txt",
        "apple-touch-icon.png",
        "vite.svg",
      ],
      manifest: {
        name: "What's the weather?",
        short_name: "WTW",
        description: "Weather forecast app made by ASC",
        theme_color: "#ffffff",
        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
      workbox: {
        // Enable offline mode with runtime caching for the app shell
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.mode === "navigate", // Cache all navigation requests (HTML)
            handler: "NetworkFirst", // Use network first, fallback to cache if offline
            options: {
              cacheName: "html-cache",
            },
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/, // Cache image assets
            handler: "CacheFirst", // Use cache first for images to serve them offline
            options: {
              cacheName: "image-cache",
              expiration: {
                maxEntries: 50, // Cache up to 50 images
                maxAgeSeconds: 30 * 24 * 60 * 60, // Cache for 30 days
              },
            },
          },
          {
            urlPattern: /\.(?:js|css)$/, // Cache JavaScript and CSS files
            handler: "StaleWhileRevalidate", // Use cache while updating from the network
            options: {
              cacheName: "static-resources",
            },
          },
          {
            urlPattern: /\.(?:woff|woff2)$/, // Cache Fonts
            handler: "StaleWhileRevalidate", // Use cache while updating from the network
            options: {
              cacheName: "static-resources",
            },
          },
        ],
      },
    }),
  ],
});
