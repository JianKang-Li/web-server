<template>
  <el-dialog title="删除确认" :visible.sync="showModal" width="fit-content" center>
    <span>文件夹名：</span><el-input v-model="dirName" class="dir-input"></el-input>
    <span slot="footer" class="dialog-footer">
      <el-button @click="showModal = false">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { createDirApi } from '@/apis';
export default {
  name: 'CreateDir',
  props: {
    path: {
      type: String,
      require: true
    }
  },
  data() {
    return {
      showModal: false,
      dirName: ''
    }
  },
  methods: {
    show() {
      this.showModal = true
    },
    submit() {
      if (this.dirName.trim()) {
        createDirApi(this.dirName, this.path).then(() => {
          this.$message({
            type: "success",
            message: '创建文件夹成功',
          })
          this.showModal = false
        }).catch(e => {
          console.log(e)
          this.$message({
            type: "error",
            message: '创建文件夹失败',
          })
        })
      }
    }
  }
}
</script>