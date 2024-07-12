import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import Vue from '@vitejs/plugin-vue'

export default defineConfig(({ mode }) => {
  const ENV = loadEnv(mode, process.cwd());

  return {
    plugins: [
      Vue(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/assets/style/common/var.scss";
                           @import "@/assets/style/common/mixin.scss";`
        }
      }
    },
    server: {
      open: true,
      host: '0.0.0.0',
      port: 9000,
      proxy: {
        [ENV.VITE_API_NS_GATEWAY]: {
          target: `${ENV.VITE_ORIGIN_GATEWAY}`,
          changeOrigin: true,
          rewrite: path => path.replace(ENV.VITE_API_NS_GATEWAY, '')
        }
      }
    }
  }
})
