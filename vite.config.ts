import { resolve } from 'path'
import { loadEnv } from 'vite'
import type { UserConfig, ConfigEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'
import WindiCSS from 'vite-plugin-windicss'
import VueJsx from '@vitejs/plugin-vue-jsx'
import VueI18n from '@intlify/vite-plugin-vue-i18n'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { createHtmlPlugin } from 'vite-plugin-html'
import { viteMockServe } from "vite-plugin-mock"
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

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
    base: './',
    plugins: [
      vue(),//解析vue
      WindiCSS(),//windicss插件
      VueJsx(),//添加jsx/tsx支持
      //自动按需导入elemen-plus,vue,vue-router
      AutoImport({
        imports: ["vue", "vue-router"],
        resolvers: [ElementPlusResolver()],
        dts: "src/auto-import.d.ts"
      }),
      Components({
        resolvers: [ElementPlusResolver(), IconsResolver()],
      }),
      //自动引入icons，图标地址：https://icones.netlify.app/collection/line-md
      Icons({
        compiler: 'vue3',
        autoInstall: true,
      }),
      //修改项目title
      createHtmlPlugin({
        inject: {
          data: {
            title: env.VITE_APP_TITLE,
            injectScript: `<script src="./inject.js"></script>`
          }
        }
      }),
      //处理和优化svg图标
      createSvgIconsPlugin({
        iconDirs: [pathResolve('src/assets/svgs')],
        symbolId: 'icon-[dir]-[name]',
        svgoOptions: true
      }),
      //多语言配置
      VueI18n({
        runtimeOnly: true,
        compositionOnly: true,
        include: [resolve(__dirname, 'src/locales/**')]
      }),
      // viteMockServe({
      //   mockPath: 'mock',
      //   enable: true,
      // }),
      legacy({
        targets: ['defaults', 'not IE 11']
      }),
    ],
    resolve: {
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.scss', '.css', '.module.scss'],
      alias: [
        // {
        //   find: 'vue-i18n',
        //   replacement: 'vue-i18n/dist/vue-i18n.cjs.js', //解决i8n警告
        // },
        {
          find: '@',
          replacement: `${pathResolve('src')}/`,
        },
      ]
    },
    css: {
      // 配置 css modules 的行为
      modules: {
        localsConvention: 'camelCase', // 默认只支持驼峰，修改为同时支持横线和驼峰
      },
      postcss: {
        plugins: [
          {
            postcssPlugin: 'internal:charset-removal',
            AtRule: {
              charset: (atRule) => {
                if (atRule.name === 'charset') {
                  atRule.remove();
                }
              },
            },
          },
        ],
      },
      //指定传递给 css 预处理器的选项
      preprocessorOptions: {
        scss: {
          /* 自动引入全局scss文件 */
          additionalData: `@import "@/styles/variables.module.scss";`,
          javascriptEnabled: true,
          charset: false,
        }
      },
    },
    json: {
      namedExports: true, //是否支持从 .json 文件中进行按名导入
      stringify: true,//导入的json会被转为 export default JSON.parse("..")
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
    server: {
      host: '0.0.0.0',
      port: 3000,
      strictPort: false,//端口被占用尝试下一个可用端口
      open: true,
      proxy: {
        '/basic-api': {
          target: 'http://localhost:3000',
          changeOrigin: true,
          ws: true,
          rewrite: (path) => path.replace(new RegExp(`^/mock-api`), ''),
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
