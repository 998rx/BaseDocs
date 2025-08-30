## FLYPage 分页组件

对 `element-plus` 的 `el-pagination` 组件进行封装，当数据量过多时，使用分页分解数据,只需传入 `total` 、`pageSize`与 `currentPage` 参数即可

FLYPage 组件位于 /packages/FLYPage


### 基本用法

```vue
<template>
  <FLYPage :total="20" :pageSize="10" :currentPage="1"></FLYPage>
</template>

```

### FLYPage 属性

| 属性 | 说明 | 类型 | 可选值 | 默认值 |
| ---- | ---- | ---- | ---- | ---- |
| currentPage | 当前页数 | `number` | - | 1 |
| pageSize | 每页显示条目个数 | `number` | - | 10 |
| pageSizes | 每页显示个数选择器的选项设置 | `number[]` | - | [10, 20, 50, 100] |
| background | 是否为分页按钮添加背景色 | `boolean` | - | false |
| isSmall | 组件布局，子组件名用逗号分隔 | `string` | total,sizes, prev, pager, next,jumper | total,sizes, prev, pager, next,jumper |
| smallSize | 是否使用小型分页样式 | `boolean` | - | false |
| total | 总条目数 | `number` | - | 0 |
| pagerCount | 设置最大页码按钮数。 页码按钮的数量，当总页数超过该值时会折叠 | `number` | - | 6 |
| prevText | 替代图标显示的上一页文字 | `string` | - | '' |
| nextText | 替代图标显示的下一页文字 | `string` | - | '' |
| total | 总条目数 | `number` | - | - |


### FLYPage 方法

| 方法名 | 说明 | 回调参数 |
| ---- | ---- | ---- |
| handleNumChange | current-page 改变时触发 | (value: number) => void |
| handleSizeChange | page-size 改变时触发 | (value: number) => void |


### FLYPage 插槽

| 插槽名 | 说明 | 子标签 |
| ---- | ---- | ---- |
| default | 自定义内容 设置文案，需要在 isSmall 中列出 slot | - |