# 前言

本项目中对一些常用的组件进行封装，方便开发者使用。如果你开发项目中自带的组件不满足你的需求，可以不使用或者自行改造，这都是可以的。

## 全局注册

项目级自定义组件一般放在 `packages`文件夹下，如果想实现组件的全局注册，有两种方法：一是在各个组件的index.ts中将封装的组件引入并注册,利用`install` 函数来实现插件式的全局注册；二是在`packages`文件夹下创建一个`index.ts`文件，将封装的组件引入并注册，并导出，最后在`main.ts`中引入并注册

### 方法一

`index.ts` （以FLYTable组件为例）
```ts
import type { App } from 'vue'
import FLYTable from './src/index.vue'

FLYTable.install = (app: App): void => {
  app.component('FLYTable', FLYTable)
}
export default FLYTable
```

在入口文件`main.ts`中的Vue 应用实例创建并挂载前全局注册

`main.ts`

```ts
import { createApp } from 'vue'
import App from './App.vue'
import FLYTable from "~/index"   //引入packages的index.ts, ~为配置的packages文件夹的路径

const app = createApp(App)
app.use(FLYTable)
app.mount('#app')
```

### 方法二

创建一个 `packages/index.ts` 文件，内容如下：`
```ts
import type { App } from 'vue'
import FLYTable from './FLYTable'
import FLYMapContainer from './FLYMapContainer'
import FLYPage from './FLYPage'
import MapTool from './MapTool'
import FLYSwitchLang from './FLYSwitchLang'
import FLYButton from './FLYButton'
import FLYLeftMenu from './FLYLeftMenu'

// 所有组件
const components = {
  FLYButton,
  FLYTable,
  FLYPage,
  MapTool,
  FLYMapContainer,
  FLYLeftMenu,
  FLYSwitchLang
}

/**
 * 组件注册
 * @param { App } app Vue 对象
 * @returns { void }
 */
const install = (app: App) => {
  // 注册组件
  Object.entries(components).forEach(([key, value]) => {
    app.component(key, value)
  })
}

export {
  FLYButton,
  FLYTable,
  FLYPage,
  MapTool,
  FLYMapContainer,
  FLYTable,
  FLYLeftMenu,
  FLYSwitchLang
}
export default {
  install,
  ...components
}
```
在入口文件`main.ts`中的Vue 应用实例创建并挂载前全局注册

`main.ts`

```ts
import { createApp } from 'vue'
import App from './App.vue'
import FLYUI from "~/index"   //引入packages的index.ts, ~为配置的packages文件夹的路径

const app = createApp(App)
app.use(FLYUI)
app.mount('#app')
```
