import { fileURLToPath, URL } from 'url'
import fs from 'fs'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const ENV = loadEnv(mode, process.cwd());
  return {
    plugins: [
      vue(),
      vueDevTools(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/assets/style/var.scss";
                           @import "@/assets/style/mixin.scss";`
        }
      }
    },
    server: {
      open: true,
      host: '0.0.0.0',
      port: 9002,
      https: {
        key: fs.readFileSync('../../../../certs/127.0.0.1+2-key.pem'),
        cert: fs.readFileSync('../../../../certs/127.0.0.1+2.pem')
      },
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
