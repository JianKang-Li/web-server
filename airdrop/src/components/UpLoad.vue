<template>
  <div class="upload">
    <el-upload ref="upload" class="upload-demo" action="" drag :http-request="httpRequest" :auto-upload="false"
      :on-progress="proUpData" :multiple="true" :file-list="fileList" :on-remove="handleRemove"
      :on-change="uploadChange">
      <el-icon class="icon"><upload-filled /></el-icon>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    </el-upload>
    <el-progress id="progress" :percentage="percentage" :format="format" :status="status"></el-progress>
    <el-button type="primary" @click="submitUpload">上传</el-button>
  </div>
</template>

<script>
import { UploadFilled } from '@element-plus/icons-vue'
import request from '@/apis/request'
import { getInfo } from '@/apis'
import { useDataStore } from "@/store"
export default {
  components: {
    UploadFilled,
  },
  data() {
    return {
      percentage: 0,
      fileList: [],
      status: null,
      param: {},
      progressFlag: true,
      store: useDataStore()
    }
  },
  methods: {
    format(percentage) {
      return `${percentage}%`
    },
    submitUpload() {
      if (this.fileList.length < 1) {
        this.$message.error('请选择文件')
      } else {
        this.$refs.upload.submit()
        this.postFile()
      }
    },

    proUpData(event) {
      this.percentage = parseInt(event.percent) // 动态获取文件上传进度
      if (this.percentage >= 100) {
        this.percentage = 100
        setTimeout(() => {
          this.percentage = 0
        }, 100)
      }
    },

    postFile() {
      request
        ._axios({
          method: 'post',
          url: `/upload?path=${this.store.path}`,
          data: this.param,
          onUploadProgress: (progressEvent) => {
            const complete = parseInt(
              (progressEvent.loaded / progressEvent.total) * 100
            )
            this.percentage = complete
          },
        })
        .then((res) => {
          if (res.status === 200) {
            this.$notify({
              title: '成功',
              message: '文件上传成功',
              type: 'success',
            })
            this.percentage = 0
            getInfo().then((res) => {
              this.store.update(res)
            })
            this.$refs.upload.clearFiles()
          } else {
            this.$notify.error({
              title: '错误',
              message: res.message,
            })
            this.progressFlag = false
            this.percentage = 0
            this.$refs.upload.clearFiles()
          }
        })
        .catch((e) => {
          console.log(e)
        })
    },

    httpRequest() { },

    handleRemove(file, fileList) {
      this.$message.warning(`已移除文件:  ${file.name}!`)
      // 每移除一个文件,param重新赋值
      this.param = new FormData()
      this.fileList = [...fileList]
      this.fileList.forEach((file) => {
        this.param.append(`file`, file.raw) // 把单个文件重命名，存储起来（给后台）
      })
    },
    uploadChange(file, fileList) {
      this.param = new FormData()
      this.fileList = [...fileList]
      this.fileList.forEach((file) => {
        this.param.append(`file`, file.raw) // 把单个文件重命名，存储起来（给后台）
      })
    },
  },
  watch: {
    status() {
      return this.percentage === 100 ? 'success' : ''
    },
  },
}
</script>

<style scoped>
.upload {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 0.3rem;
}

.upload-demo {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 30vw;
  height: fit-content;
  margin-bottom: 20px;
}

.icon {
  height: 20vh;
  width: 20vw;
}

.icon :deep(svg) {
  height: 70%;
  width: 70%;
}

#progress {
  margin-top: 10px;
  max-width: 40rem;
  width: 70%;
  position: static;
}

:deep(.el-upload-list) {
  width: 95vw;
  max-width: 95vw;
  text-align: center;
}

:deep(.el-upload-list__item-name) {
  max-width: 100%;
  margin: 0;
  padding: 0;
}
</style>
