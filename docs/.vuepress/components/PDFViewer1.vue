<template>
  <div class="pdf-viewer">
    <!-- PDF文件选择器 -->
    <div class="pdf-selector">
      <div class="file-list">
        <div 
          v-for="file in pdfFiles" 
          :key="file.name"
          class="file-item"
          :class="{ 'active': selectedFile === file.path }"
          @click="selectFile(file)"
        >
          <el-icon><Document /></el-icon>
          <span class="file-name">{{ file.name }}</span>
        </div>
        <div v-if="pdfFiles.length === 0" class="no-files">
          <el-icon><FolderOpened /></el-icon>
          <span>未找到PDF文件</span>
        </div>
      </div>
    </div>
    
    <!-- 控制栏 -->
    <div class="pdf-controls" v-if="pdfPages > 0">
      <div class="controls-left">
        <span class="page-info">
          第 {{ currentPage }} 页 / 共 {{ pdfPages }} 页
        </span>
      </div>
      
      <div class="controls-right">
        <el-button size="small" @click="zoomOut">
          -
        </el-button>
        <span class="zoom-info">{{ Math.round(zoom * 100) }}%</span>
        <el-button size="small" @click="zoomIn">
          +
        </el-button>
        <el-button size="small" @click="fitWidth">适应宽度</el-button>
        <el-button size="small" @click="fitPage">适应页面</el-button>
      </div>
    </div>
    
    <!-- 加载状态 -->
    <div v-if="loading" class="pdf-loading">
      <el-icon class="is-loading"><Loading /></el-icon>
      <span>正在加载PDF...</span>
    </div>
    
    <!-- 错误提示 -->
    <div v-if="error" class="pdf-error">
      <el-alert :title="error" type="error" show-icon />
    </div>
    
    <!-- PDF显示区域 -->
    <div class="pdf-container" :class="{ 'has-controls': pdfPages > 0 }">
      <canvas 
        v-for="pageIndex in pdfPages" 
        :id="`pdf-canvas-${pageIndex}`"  
        :key="pageIndex" 
        :class="{ 'active': pageIndex === currentPage }"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import * as PDFJS from 'pdfjs-dist'
import * as PdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs'
import { nextTick, ref, Ref, watch, onMounted } from 'vue'
import { isEmpty, debounce } from 'lodash-es'
import { ElNotification } from 'element-plus'
import { Refresh, Document, FolderOpened } from '@element-plus/icons-vue'


// PDF文件列表相关数据
const pdfFiles = ref([])
const selectedFile = ref('')

// 获取PDF文件列表
const getPDFFiles = async () => {
  try {
    const pdfsDir = '/BaseDocs/pdfs/'
    
    const knownFiles = [
      '产业振兴.pdf','创新赋能.pdf','就业优先.pdf','青春中国.pdf','人才振兴.pdf',
      '社会心态.pdf','社区治理.pdf','生态振兴.pdf','数字乡村.pdf','数字政府.pdf',
      '网络治理.pdf','文化振兴.pdf','乡村治理.pdf','依法治国.pdf','营商环境.pdf',
      '执法为民.pdf','智慧治理.pdf','组织振兴.pdf'
    ]
    
    const files = knownFiles.map(filename => ({
      name: filename,
      path: pdfsDir + filename,
    }))
    
    pdfFiles.value = files
    
  } catch (error) {
    console.error('获取PDF文件列表失败:', error)
  }
}

// 选择PDF文件
const selectFile = (file) => {
  selectedFile.value = file.path
  // 重置PDF相关状态
  pdfDoc = null
  pdfPages.value = 0
  currentPage.value = 1
  zoom.value = 1.0
  pdfScale.value = 1.3
  error.value = ''
}

// 组件挂载时获取文件列表
onMounted(() => {
  getPDFFiles()
})


// In vite4, it is not support to import pdfWorker from pdf.worker.entry.js
// So we should to set window.pdfjsWorker ourself
window.pdfjsWorker = PdfWorker
let pdfDoc:any = null
const pdfPages:Ref = ref(0)
const currentPage = ref(1)
const zoom = ref(1.0)
const loading = ref(false)
const error = ref('')
const pdfScale:Ref = ref(1.3)
const loadFile = async (url:any) => {
  loading.value = true
  error.value = ''
  
  try {
    // 设定pdfjs的 workerSrc 参数 - 使用CDN链接
    PDFJS.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.2.67/pdf.worker.min.js'
    const loadingTask = PDFJS.getDocument(url)
    const pdf = await loadingTask.promise
    
    pdfDoc = pdf // 保存加载的pdf文档对象
    pdfPages.value = pdf.numPages // 获取pdf文件的总页数
    
    await nextTick(() => {
      renderAllPages() // 渲染所有页面
    })
  } catch (err:any) {
    error.value = '加载PDF文件失败: ' + err.message
    ElNotification.error({
      message: '加载PDF文件失败'
    })
  } finally {
    loading.value = false
  }
}

const renderPage = (num:any) => {
  if (!pdfDoc) return
  
  pdfDoc.getPage(num).then((page:any) => {
    page.cleanup()
    const canvas:any = document.getElementById(`pdf-canvas-${num}`)
    if (canvas) {
      const ctx = canvas.getContext('2d')
      const dpr = window.devicePixelRatio || 1
      const bsr = ctx.webkitBackingStorePixelRatio ||
                  ctx.mozBackingStorePixelRatio ||
                  ctx.msBackingStorePixelRatio ||
                  ctx.oBackingStorePixelRatio ||
                  ctx.backingStorePixelRatio ||
                  1
      const ratio = dpr / bsr
      const viewport = page.getViewport({ scale: pdfScale.value })
      canvas.width = viewport.width * ratio
      canvas.height = viewport.height * ratio
      canvas.style.width = viewport.width + 'px'
      canvas.style.height = viewport.height + 'px'
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
      const renderContext = {
        canvasContext: ctx,
        viewport: viewport
      }
      page.render(renderContext)
    }
  })
}

// 重新渲染所有页面
const renderAllPages = () => {
  if (!pdfDoc || !pdfPages.value) return
  
  for (let i = 1; i <= pdfPages.value; i++) {
    renderPage(i)
  }
}

// 缩放控制方法
const zoomIn = () => {
  zoom.value = Math.min(zoom.value + 0.1, 3.0)
  pdfScale.value = zoom.value * 1.3
  renderAllPages()
}

const zoomOut = () => {
  zoom.value = Math.max(zoom.value - 0.1, 0.5)
  pdfScale.value = zoom.value * 1.3
  renderAllPages()
}

const fitWidth = () => {
  // 适应宽度逻辑 - 计算合适的缩放比例
  if (pdfDoc && currentPage.value) {
    pdfDoc.getPage(currentPage.value).then((page:any) => {
      const containerWidth = document.querySelector('.pdf-container')?.clientWidth || 800
      const viewport = page.getViewport({ scale: 1 })
      const scale = (containerWidth - 40) / viewport.width // 减去padding
      zoom.value = Math.max(scale, 0.5)
      pdfScale.value = zoom.value * 1.3
      renderAllPages()
    })
  }
}

const fitPage = () => {
  // 适应页面逻辑 - 重置为默认缩放
  zoom.value = 1.0
  pdfScale.value = 1.3
  renderAllPages()
}

// 监听选中的文件变化
watch(() => selectedFile.value, (newValue:any) => {
  if (newValue) {
    loadFile(newValue)
  }
}, {
  immediate: true
})
</script>

<style scoped>
/* 在当前页面中让内容区域变宽 */
:deep(.vp-page [vp-content]) {
  max-width: 1400px !important;
}

.pdf-viewer {
  width: 100%;
  height: 800px;
  border: 1px solid #e4e7ed;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* PDF文件选择器样式 */
.pdf-selector {
  border-bottom: 1px solid #e2e8f0;
  background: #f8fafc;
  padding: 16px;
}

.selector-header {
  display: flex;
  height: 30px;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.file-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  background: #fff;
  padding: 8px;
  min-height: 60px;
}

.file-item {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  cursor: pointer;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  background: #fff;
  transition: all 0.2s ease;
  white-space: nowrap;
  flex-shrink: 0;
}

.file-item:hover {
  background: #f1f5f9;
}

.file-item.active {
  background: #3b82f6;
  color: #fff;
}

.file-item .el-icon {
  margin-right: 8px;
  font-size: 16px;
}

.file-name {
  flex: 1;
  font-size: 14px;
  font-weight: 500;
}

.file-size {
  font-size: 12px;
  color: #64748b;
  margin-left: 8px;
}

.file-item.active .file-size {
  color: #e2e8f0;
}

.no-files {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  color: #94a3b8;
  font-size: 14px;
}

.no-files .el-icon {
  margin-right: 8px;
  font-size: 18px;
}

.pdf-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border-bottom: 1px solid #e2e8f0;
  border-radius: 12px 12px 0 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.controls-left,
.controls-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.page-info {
  font-size: 14px;
  color: #475569;
  font-weight: 700;
  min-width: 140px;
  text-align: center;
  background: #fff;
  padding: 6px 12px;
  border-radius: 6px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.zoom-info {
  font-size: 14px;
  color: #475569;
  font-weight: 600;
  min-width: 60px;
  text-align: center;
  background: #fff;
  padding: 6px 12px;
  border-radius: 6px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.pdf-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  color: #64748b;
  background: #f8fafc;
  border-radius: 0 0 12px 12px;
  flex: 1;
}

.pdf-loading .el-icon {
  font-size: 36px;
  margin-bottom: 16px;
  color: #3b82f6;
}

.pdf-error {
  padding: 40px 20px;
  background: #fef2f2;
  border-radius: 0 0 12px 12px;
  flex: 1;
}

.pdf-container {
  padding: 0;
  flex: 1;
  overflow: auto;
  background: #f8fafc;
  border-radius: 0 0 12px 12px;
  /* 滚动条样式 */
  scrollbar-width: thin;
  scrollbar-color: #94a3b8 #f1f5f9;
}

/* Webkit浏览器滚动条样式 */
.pdf-container::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

.pdf-container::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 6px;
}

.pdf-container::-webkit-scrollbar-thumb {
  background: #94a3b8;
  border-radius: 6px;
  border: 2px solid #f1f5f9;
}

.pdf-container::-webkit-scrollbar-thumb:hover {
  background: #64748b;
}

/* 水平滚动条样式 */
.pdf-container::-webkit-scrollbar:horizontal {
  height: 10px;
}

/* 垂直滚动条样式 */
.pdf-container::-webkit-scrollbar:vertical {
  width: 10px;
}

.pdf-container.has-controls {
  max-height: none;
}

canvas {
  display: block;
  margin: 20px auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  transition: all 0.3s ease;
  background: #fff;
  border: 1px solid #e2e8f0;
}

canvas:hover {
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  transform: translateY(-1px);
}
</style>