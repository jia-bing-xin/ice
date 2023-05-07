import { resolve } from 'path'
import { loadEnv } from 'vite'
import type { UserConfig, ConfigEnv } from 'vite'
import react from '@vitejs/plugin-react'
import legacy from '@vitejs/plugin-legacy'
import vitePluginImp from 'vite-plugin-imp'

const root = process.cwd()
const pathResolve = (dir: string) => resolve(root, '.', dir)

export default ({ command, mode }: ConfigEnv): UserConfig => {
  let env: Record<string, string>
  const isBuild = () => command === 'build'
  if (!isBuild) {
    env = loadEnv(process.argv[3] === '--mode' ? process.argv[4] : process.argv[3], root)
  } else {
    env = loadEnv(mode, root)
  }
  return {
    base: env.VITE_BASE_PATH || './',
    plugins: [
      react(),
      legacy({
        targets: ['defaults', 'not IE 11']
      }),
      vitePluginImp({
        libList: [
          {
            libName: "antd",
            style: (name) => `antd/es/${name}/style`,
          },
        ],
      }),
    ],
    resolve: {
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.less', '.css', '.module.scss'],
      alias: {
        '@': pathResolve('src'),
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: '@import "./src/styles/variable.scss";',
          modifyVars: {
            '@primary-color': '#4377FE',//设置antd主题色
          },
        },
      }
    },
    build: {
      minify: 'terser',
      outDir: env.VITE_OUT_DIR || 'dist',
      sourcemap: env.VITE_SOURCEMAP === 'true',
      terserOptions: {
        compress: {
          drop_debugger: env.VITE_DROP_DEBUGGER === 'true',
          drop_console: env.VITE_DROP_CONSOLE === 'true'
        }
      },
      emptyOutDir: false // 默认情况下，若 outDir 在 root 目录下，则 Vite 会在构建时清空该目录
    },
  }
}
