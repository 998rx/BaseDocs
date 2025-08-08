import { defineClientConfig  } from '@vuepress/client'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
 
export default defineClientConfig ({
  enhance({ app }){
    // app 是由 createApp 创建的 Vue 应用实例
    app.use(ElementPlus)
  }
})