## FLYModal 按钮组件

基于vue3.x、ts封装 ，支持设置 宽度、高度以及标题，默认有遮罩层

FLYModal 组件位于 /packages/FLYModal 内，FLYModal 支持全局引入，按需引入


### 基本用法

```vue
<template>
  <FLYModal  @confirm="clickComponent" class="pie-panel"  width="700px" moveLeft="50px" moveTop="150px"
  :showBtn="false">
        <template v-slot:operateItem> 插槽内容</template>

  </FLYModal>
</template>

```

### FLYModal 属性

| 属性 | 说明 | 类型 | 可选值 | 默认值 |
| ---- | ---- | ---- | ---- | ---- |
| width | 宽度 | `string` | - | - |
| height| 高度 | `string` | - | - |
| title | 标题 | `string` | - | - |

### FLYModal 事件

| 方法名 | 说明 | 回调参数 |
| ---- | ---- | ---- |
| confirm | 确认事件 | (e: MouseEvent) => void |
| cancel | 取消事件 | (e: MouseEvent) => void |
