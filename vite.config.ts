import { resolve } from 'path'
import { loadEnv } from 'vite'
import type { UserConfig, ConfigEnv } from 'vite'
import react from '@vitejs/plugin-react'
import legacy from '@vitejs/plugin-legacy'
import vitePluginImp from 'vite-plugin-imp'
import WindiCSS from 'vite-plugin-windicss'
import { createHtmlPlugin } from 'vite-plugin-html'

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
      WindiCSS(),
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
      //修改项目title
      createHtmlPlugin({
        inject: {
          data: {
            title: env.VITE_APP_TITLE || 'ice',
            injectScript: `<script src="./inject.js"></script>`
          }
        }
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
    json: {
      namedExports: true, //是否支持从 .json 文件中进行按名导入
      stringify: true,//导入的json会被转为 export default JSON.parse("..")
    },
    server: {
      host: '0.0.0.0',
      port: 3000,
      strictPort: false,//端口被占用尝试下一个可用端口
      open: true,
      proxy: {
        [env.VITE_API_BASEPATH]: {
          target: env.VITE_API_BASEPATH,
          changeOrigin: true,
          ws: true,
          rewrite: (path) => path.replace(new RegExp(`^${env.VITE_API_BASEPATH}`), ''),
          // only https
          // secure: false
        },
      },
      hmr: {
        overlay: false
      },
      fs: {
        strict: true, //限制为工作区 root 路径以外的文件的访问
        allow: ['..'],//限制哪些文件可以通过 /@fs/ 路径提供服务
      }
    },
  }
}
