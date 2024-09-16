import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import autoprefixer from 'autoprefixer'
import postCssPxToRem from 'postcss-pxtorem'
// const env = loadEnv(mode, process.cwd())
export default defineConfig({
    base:'',
    plugins: [react()],
    // build: {
    //   target: 'esnext'
    // },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'), //配置@别名
      },
    },
    server: {
      proxy: {
        '/api': {
          target: 'http://20.2.82.55:5000',
          changeOrigin: true,
          rewrite: (path) => {
            console.log("path.replace(/^\/api/, '')",path.replace(/^\/api/, ''))
            return path.replace(/^\/api/, '')
          }
        },
      },
    },
    css: {
      postcss: {
        plugins: [
          //自动补充前缀
          autoprefixer({
            overrideBrowserslist: [
              'Android 4.1',
              'iOS 7.1',
              'Chrome > 31',
              'ff > 31',
              'ie >= 8',
            ],
          }),
          //单位转化
          // postCssPxToRem({
          //   // rootValue: 75, // 75表示750设计稿，37.5表示375设计稿
          //   //@ts-expect-error 这里不做类型检测
          //   rootValue({ file }){
          //     // 项目中使用的 antd官方社区的 antd-mobile 组件库。这里做了区分，如果样式文件命中有 antd-mobile 则以 375 样稿转化。这里不做区分，那么 antd-mobile 各组件样式会变形。
          //     // return file.indexOf('antd-mobile') !== -1 ? 37.5 : 75
          //     // console.log('转换的文件路径', file)
          //     // pc设计稿宽度1920，移动端设计稿375
          //     // console.log('=====', file.indexOf('pc'))
          //     if (file.indexOf('pc') !== -1) {
          //       return 192
          //     } else {
          //       return 37.5
          //     }
          //   },
          //   propList: ['*'], // 需要转换的属性，这里选择全部都进行转换
          //   selectorBlackList: ['norem'], // 过滤掉norem-开头的class，不进行rem转换
          //   // exclude: (e) => {
          //   //   if (e.indexOf('pc') !== -1) {
          //   //     return true
          //   //   }
          //   //   return false
          //   // }
          // }),
        ],
      },
    },
  })
