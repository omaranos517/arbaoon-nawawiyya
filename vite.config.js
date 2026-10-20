import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

import cfg from './app.config.json' with { type: 'json' }
import pkg from './package.json' with { type: 'json' }

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
    base: mode === 'web' ? '/' : './',
    plugins: [
        vue(),
        vueDevTools(),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    define: {
        __APP_ID__: JSON.stringify(cfg.appId),
        __APP_VERSION__: JSON.stringify(pkg.version),
    },
}))
