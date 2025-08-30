## FLYTable 表格组件

对 `element-plus` 的 `el-table` 组件进行封装，只需传入 `columns` 与 `data` 参数，即可渲染出响应的表格出来。

FLYTable 组件位于 /packages/FLYTable

### 基础用法

```vue
<script setup lang="ts">
import { reactive } from 'vue'
const columns = reactive([
  {
    prop: 'title',
    label: 'title'
  },
  {
    prop: 'author',
    label: 'author'
  }
])

const data = reactive([
  {
    title: 'title1',
    author: 'author1'
  },
  {
    title: 'title2',
    author: 'author2'
  },
  {
    title: 'title3',
    author: 'author3'
  }
])
</script>

<template>
   <FLYTable :columns="columns" :data="data"></FLYTable>
</template>

```


### FLYTable 属性


| 属性 | 说明 | 类型 | 可选值 | 默认值 |
| ---- | ---- | ---- | ---- | ---- |
| columns | 表头结构，[详见](#Columns) | `TableColumn[]` | - | [] |
| data | 表格数据 | `Recordable[]` | - | [] |
| loading | 加载状态,当 loading 值为 true 时，表格会显示一个加载中的状态；当 loading 值为 false 时，表格会显示数据内容。 | `boolean` | `true、false` | false |
| border | 是否带有纵向边框 | `number` | `true、false` | 1 |
| maxHeight | table 的最大高度 | `number` | - | 600 |
| objectSpanMethod | 合并行或列的计算方法  | `Function` | - | - |
| rowClass | 表头单元格的 style 的回调方法，也可以使用一个固定的 Object 为所有表头单元格设置一样的 Style | `Function/Object` | - | - |
| highlightRow | 是否要高亮当前行 | `boolean` | - | false |
| getRowKeys | 行数据的 Key，用来优化 Table 的渲染 | `string` | - | id |
| getExpandRowKeys | 可以通过该属性设置 Table 目前的展开行，需要设置 row-key 属性才能使用，该属性为展开行的 keys 数组。 | `array` | - | [] |
| stripe | 是否为斑马纹 | `boolean` | - | false |
| align | 内容对齐方式 | `string` | `left`/`center`/`right` | left |
| headerAlign | 表头对齐方式 | `string` | `left`/`center`/`right` | left |
| isAction | 是否显示表格操作 | `boolean` | - | false |
| action | 操作列表头名称 | `string` | - | 操作 |
| operationWidth | 操作列宽度 | `string/number` | - | - |
| showIndex | 是否展示序号列 | `boolean` | - | false |
| indexFixed | 是否固定序号列 | `boolean` | - | false |
| showCheckbox | 是否展示多选框列 | `boolean` | - | false |
| lookBtn | 是否显示查看按钮（isAction为true时） | `boolean` | - | false |
| editBtnIcon | 是否显示编辑图标（isAction为true时） | `boolean` | - | false |
| lookBtnIcon | 是否显示查看图标（isAction为true时） | `boolean` | - | false |
| deleteBtnIcon | 是否显示删除图标（isAction为true时） | `boolean` | - | false |
| editBtn | 是否显示编辑按钮（isAction为true时） | `boolean` | - | false |
| deleteBtn | 是否显示删除按钮（isAction为true时） | `boolean` | - | false |
| editText | 自定义编辑按钮文字 | `string` | - | 编辑 |
| deleteBtnText | 自定义删除按钮文字 | `string` | - | 删除 |
| detailBtn | 是否显示详情按钮（isAction为true时） | `boolean` | - | false |
| deleteBtnPopout | 是否显示删除按钮（isAction为true时） | `boolean` | - | false |
| dynamicShow | 是否自定义操作列按钮 | `boolean` | - | false |
| dynamicBtnName | 操作列按钮动态数组 | `array` | - | [] |
| lookText | 自定义查看按钮文字 | `string` | - | 查看 |



### Columns<span id="Columns"></span>

除了以下属性，还支持 `element-plus` 的 `TableColumn` 属性。

| 属性 | 说明 | 类型 | 可选值 | 默认值 |
| ---- | ---- | ---- | ---- | ---- |
| prop | 唯一值，如需展示正确的数据，需要与 data 中的属性名对应 | `string` | - | - |
| label | 表头名称 | `string` | - | - |
| sortable | 对应列是否可以排序， 如果设置为 'custom'，则代表用户希望远程排序，需要监听 Table 的 sort-change 事件| `boolean/string` | - | - |
| width | 对应列的宽度 | `string/number` | - | - |
| min-width | 对应列的最小宽度， 对应列的最小宽度， 与 width 的区别是 width 是固定的，min-width 会把剩余宽度按比例分配给设置了 min-width 的列 | `string/number` | - | - |
| filters | 数据过滤的选项， 数组格式，数组中的元素需要有 text 和 value 属性。 数组中的每个元素都需要有 text 和 value 属性。| `Array<{text: string, value: string}>` | - | - |
| filter-method | 数据过滤使用的方法 | `function` | - | (value: any, row: any, column: any) => void |
| align | 对齐方式 | `enum` | left、center、right | left |
| fixed | 列是否固定在左侧或者右侧。 true 表示固定在左侧 | `enum/boolean` | - | false |
| isTemplate | 是否支持自定列的内容 | `boolean` | - | false |



### FLYTable 方法

| 方法名 | 说明 | 回调参数 |
| ---- | ---- | ---- |
| on-current-change | 当表格的当前行发生变化的时候会触发该事件，如果要高亮当前行，请打开表格的 highlight-current-row 属性 | (currentRow: any, oldCurrentRow: any) => void |
| on-select | 当用户手动勾选数据行的 Checkbox 时触发的事件 | <T = any>(selection: T[], row: T) => void |
| on-select-cancel | 当用户手动取消勾选数据行的 Checkbox 时触发的事件 | <T = any>(selection: T[], row: T) => void |
| on-select-all | 当用户手动勾选全选 Checkbox 时触发的事件 | (selection: any[]) => void |
| on-selection-change | 当选择项发生变化时会触发该事件 | (newSelection: any[]) => void |
| on-sort-change | 当表格的排序条件发生变化的时候会触发该事件 | (data: {column: any, prop: string, order: any }) => void |
| on-row-click | 当某一行被点击时会触发该事件 | (row: any, column: any, event: Event) => void |
| on-row-dblclick | 当某一行被双击时会触发该事件 | (row: any, column: any, event: Event) => void |
| cellClick | 当某个单元格被点击时会触发该事件 | (row: any, column: any, cell: HTMLTableCellElement, event: Event) => void |
| expandChange | 当用户对某一行展开或者关闭的时候会触发该事件（展开行时，回调的第二个参数为 expandedRows；树形表格时第二参数为 expanded） | (row: any, expandedRows: any[]) => void & (row: any, expanded: boolean) => void |
| on-row-dblclick | 当某一行被双击时会触发该事件 | (row: any, column: any, event: Event) => void |


### FLYTable 插槽

| 插槽名 | 说明 | 子标签 |
| ---- | ---- | ---- |
| prop | 对于每一列，当isTemplate为true时，可以通过插槽来自定义该列的内容。 | prop |
| action | 当isAction为true时，可以通过插槽来自定义操作列的内容 | action |
