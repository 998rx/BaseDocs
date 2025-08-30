---
title: 自定义组件
createTime: 2025/08/25 15:05:05
permalink: /article/wt6m39h6/
---
# 自定义组件

<!-- @include: introduction_com.md -->

## 分页器

基于Element Plus分页器的二次封装组件，提供开箱即用的分页功能解决方案。该组件通过双向数据绑定机制实现当前页码（currentPage）和分页尺寸（pageSize）的实时同步，支持通过layout属性灵活配置分页器布局元素（如前缀说明、页码列表、跳转控件等）。组件内置了分页尺寸切换事件（handleSizeChange）和页码变更事件（handleNumChange），开发者可通过@handle-size-change和@handle-num-change监听这些事件并执行数据重载逻辑。

<UsingPage></UsingPage>

```vue
<template>
  <SWPage
    v-model:current-page="current"
    v-model:page-size="size"
    :total="100"
    :page-sizes="[10, 20, 50]"
    :background="true"
    layout="total, sizes, prev, pager, next, jumper"
    @handle-size-change="handleSizeChange"
    @handle-num-change="handlePageChange"
  />
</template>

<script setup>
import { ref } from 'vue'

const current = ref(1)
const size = ref(10)

const handleSizeChange = (newSize) => {
  console.log('每页条数变化:', newSize)
  // 这里通常调用接口重新获取数据
}

const handlePageChange = (newPage) => {
  console.log('当前页码变化:', newPage)
  // 这里通常调用接口重新获取数据
}
</script>

<style>
/* 可自定义分页样式 */
:root {
  --page-active-color: #0b448f;
  --page-font-color: #ffffff;
}
</style>
```

<!-- @include: FLYButton.md --> 

<!-- @include: FLYModal.md -->

<!--- @include: FLYPage.md -->

<!-- @include: FLYSwitchLang.md -->

<!--- @include: FLYTable.md -->



