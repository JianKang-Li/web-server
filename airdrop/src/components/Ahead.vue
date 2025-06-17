<template>
  <div>
    <div class="header">
      <div class="logo">AirDrop</div>
      <div class="tip">
        <el-button @click="centerDialogVisible = true">Tips</el-button>
      </div>
    </div>

    <el-dialog title="Tips" v-model="centerDialogVisible" width="fit-content" center>
      <p>页面预览文件类型靠自定义和浏览器支持</p>
      <p>移动端浏览器不支持pdf预览</p>
      <p>此项目仅用于私人使用，请勿用于商业使用</p>
      <p>文本同传需要双方同时在文本同传页面才能接收到信息</p>
      <template #footer>
        <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
      </template>
    </el-dialog>

    <el-divider />
  </div>
</template>

<script>
export default {
  data() {
    return {
      centerDialogVisible: false,
    }
  },
}
</script>

<style scoped>
.logo {
  font-size: 1.5rem;
}

.header {
  display: flex;
  width: 100%;
  justify-content: space-between;
}
</style>
