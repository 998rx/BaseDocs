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

const current = ref(2)
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