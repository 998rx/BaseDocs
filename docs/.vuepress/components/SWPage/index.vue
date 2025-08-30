<template>
  <div class="pie-page">
    <!-- el-pagination组件 -->
    <el-pagination
      v-model:currentPage="props.currentPage"
      v-model:page-size="props.pageSize"
      :page-sizes="props.pageSizes"
      :background="background"
      :layout="layout"
      :small="smallSize"
      :total="total"
      :pager-count="pagerCount"
      :prev-text="prevText"
      :next-text="nextText"
      @size-change="handleSizeChange"
      @current-change="handleNumChange"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useHandler } from "./hooks";

const props = withDefaults(
  defineProps<{
    isSmall: boolean; //是否为小型
    smallSize: boolean; //是否为小型
    currentPage: number; //目前选中的页数
    pageSize: number; //每页显示的条数
    total: any; //总数
    background: boolean; //是否有背景颜色
    prevText: string; //替代图标显示的上一页文字
    nextText: string; //替代图标显示的下一页文字
    pagerCount: number;
    pageSizes: any;
    layout: string;
  }>(),
  {
    isSmall: false,
    smallSize: true,
    currentPage: 1,
    pageSize: 10,
    total: 50,
    background: false,
    prevText: "",
    nextText: "",
    pagerCount: 6,
    pageSizes: [10, 20, 50, 100],
    layout: "sizes, prev, pager, next",
  }
);

const emit = defineEmits<{
  (event: "handleSizeChange", e: MouseEvent): void;
  (event: "handleNumChange", e: MouseEvent): void;
}>();

const { handleSizeChange, handleNumChange } = useHandler(props, emit);
</script>

<style lang="less" scoped>
.pie-page {
  margin-top: 20px;
  display: flex;
  flex-direction: row-reverse;
  :deep(.el-pagination__sizes .el-input__inner) {
    background: transparent;
    // color: @main-font-color;
  }
  :deep(.el-pagination.is-background .btn-next),
  :deep(.el-pagination.is-background .btn-prev),
  :deep(.el-pagination.is-background .el-pager li) {
    // background-color: @page-bg-color;
    // color: @page-font-color;
  }

  :deep(.el-pagination.is-background .el-pager li:not(.is-disabled).is-active) {
    // background-color: #02c1eb;
    // background-color: @page-active-color !important;
    // color: @page-font-color-ac;
    // background-color: #0b448f;
  }

  :deep(.el-pagination.is-background .btn-next:disabled),
  :deep(.el-pagination.is-background .btn-prev:disabled) {
    // background-color: @page-bg-color;
    // color: @page-font-color-disabled;
  }
  :deep(.el-pagination__jump) {
    // color: @main-font-color;
    .el-input__wrapper {
      font-size: 14px;
    }
  }
  :deep(.el-pagination__total) {
    // color: @main-font-color;
  }
}
</style>
