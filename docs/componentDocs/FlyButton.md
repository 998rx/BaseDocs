## FLYButton 按钮组件

二次封装 `button` ，支持修改按钮的类型、宽度、背景颜色以及文字颜色

FLYButton 组件位于 /packages/FLYButton 内，FLYButton 已经全局引入，无需在手动引入


### 基本用法

```vue
<template>
  <FLYButton type="primary" @click="clickComponent" class="btn-component">查看</FLYButton>
</template>

```

### FLYButton 属性

| 属性 | 说明 | 类型 | 可选值 | 默认值 |
| ---- | ---- | ---- | ---- | ---- |
| nativeType | 原生 button 标签的 type 属性 | `string` | ` button、submit、reset` |button |
| width | 宽度 | `string` | - | - |
| type | 按钮类型 | `string` | default、primary、success、info、warning、danger | default |
| plain | 朴素按钮 | `boolean` | - | - |
| disabled | 禁用状态 | `boolean` | - | - |
| color | 自定义颜色 | `string` | - | - |

### FLYButton 方法

| 方法名 | 说明 | 回调参数 |
| ---- | ---- | ---- |
| click | 按钮点击事件 | (e: MouseEvent) => void |
