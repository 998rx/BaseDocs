/*
 * @Author: zrx
 * @Date: 2025-08-08 14:37:33
 * @LastEditors: zrx
 * @LastEditTime: 2025-08-11 13:45:53
 * @FilePath: \pressDocs\docs\.vuepress\config.js
 * @Description: 
 */
import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'
import { registerComponentsPlugin } from '@vuepress/plugin-register-components'
import { prismjsPlugin } from '@vuepress/plugin-prismjs'
import { searchPlugin } from '@vuepress/plugin-search'
import { path } from '@vuepress/utils'
import { navbar_zh } from './src/navbar/zh'
import { navbar_en } from './src/navbar/en'
import { sidebar_zh } from './src/sidebar/zh'
import { sidebar_en } from './src/sidebar/en'


export default defineUserConfig({
  bundler: viteBundler(),
  host: 'localhost',
  port: 8089,
  base: '/BaseDocs/',
  head:[
    ['link',{rel: 'icon', href:'/img/logo.jpg'}],
    ['link', { rel: 'stylesheet', href: '/styles/index.css' }],
  ],
  locales: {
    '/': {
      lang: 'zh-CN',
      title: '帮助中心',
      description: '产品使用帮助文档'
    },
    '/en/': {
      lang: 'en-US',
      title: 'Help Center',
      description: 'Product help documentation'
    }
  },
  theme: defaultTheme({
    logo: '/img/logo.jpg',
    locales: {
      '/': {
        selectLanguageName: '简体中文',
        selectLanguageText: '选择语言',
        selectLanguageAriaLabel: '选择语言',
        lastUpdatedText: '上次更新',
        contributorsText: '贡献者',
        notFound: [
          '这里什么都没有',
          '我们怎么到这来了？',
          '这是一个 404 页面',
          '但是你可以在搜索栏中搜索',
        ],
        navbar: navbar_zh,
        sidebar: sidebar_zh,
      },
      '/en/': {
        selectLanguageName: 'English',
        navbar: navbar_en,
        sidebar: sidebar_en
      }
    },
  }),

  plugins: [
    [ 
      prismjsPlugin({
        theme: 'tomorrow'
      })
    ],
    [
      searchPlugin({
        locales: {
          zh: {
            translations: {
              button: {
                buttonText: "搜索",
                buttonAriaLabel: "搜索文档",
              },
              modal: {
                noResultsText: "无法找到相关结果",
                resetButtonTitle: "清除查询结果",
                footer: {
                  selectText: "选择",
                  navigateText: "切换",
                },
              },
            },
          },
          en: {
            translations: {
              button: {
                buttonText: "Search",
                buttonAriaLabel: "Search for Documents",
              },
              modal: {
                noResultsText: "Unable to find relevant results",
                resetButtonTitle: "Clear Query Results",
                footer: {
                  selectText: "select",
                  navigateText: "switch",
                },
              },
            },
          },
        },
      })
    ],
    ['demo-container'],
    [ 
      registerComponentsPlugin({
        componentsDir: path.resolve(__dirname, './components'),
      })
    ],
  ]
})