<template>
  <div>
    <div class="header">
      <div class="logo">AirDrop</div>
      <div class="tip">
        <el-button @click="centerDialogVisible = true">Tips</el-button>
      </div>
    </div>

    <el-dialog
      title="Tips"
      :visible.sync="centerDialogVisible"
      width="fit-content"
      center
    >
      <p>页面预览文件类型靠自定义和浏览器支持</p>
      <p>移动端浏览器不支持pdf预览</p>
      <p>后续可能增加登录功能</p>
      <p>此项目仅用于私人使用，请勿用于商业使用</p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="centerDialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      centerDialogVisible: false,
    };
  },
};
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
