import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'
import { registerComponentsPlugin } from '@vuepress/plugin-register-components'
import { path } from '@vuepress/utils'
import { navbar } from './config/navbar.js'
import { sidebar } from './config/sidebar.js'


export default defineUserConfig({
  bundler: viteBundler(),
  lang: 'zh-CN',
  title: '帮助中心',
  description: '产品使用帮助文档',
  base: '/docs/',
  
  markdown: {
    code: {
      lineNumbers: false // 代码块显示行号
    }
  },

  theme: defaultTheme({
    navbar,
    sidebar
  }),

  plugins: [
     ['demo-container'],
     [ 
      registerComponentsPlugin({
        componentsDir: path.resolve(__dirname, './components'),
      })
    ]
  ]
})