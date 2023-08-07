import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import path from 'path'
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';
// import styleImport, { VantResolve } from 'vite-plugin-style-import';
import postCssPxToRem from "postcss-pxtorem"


// function _resolve(dir: string) {
//     return path.resolve(__dirname, dir)
//   }


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [VantResolver()],
    }),
  ],

  // plugins: [
  //   vue(),
  //   styleImport({
  //     resolves: [VantResolve()],
  //     libs: [
  //       {
  //         libraryName: 'vant',
  //         esModule: true,
  //         resolveStyle: name => `../es/${name}/style`
  //       }
  //     ]
  //   }),
  // ],
  css: {
    postcss: {
      plugins: [
        postCssPxToRem({
          rootValue: 37.5, // 1rem的大小
          propList: ['*'], // 需要转换的属性，这里选择全部都进行转换
          selectorBlackList: [".norem"], // 过滤掉.norem-开头的 class，不进行 rem 转换
        })
      ]
    },
    preprocessorOptions: {
      scss: {
        additionalData: "@import '../assets/styles/variables.scss';"
      }
    }
  },
  // resolve: {
  //   alias: {
  //     '@': _resolve('src'),
  //   },
  // },
})

