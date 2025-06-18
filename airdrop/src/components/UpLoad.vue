<template>
  <div class="upload" v-if="isAdmin">
    <el-upload ref="upload" class="upload-demo" action="" drag :http-request="httpRequest" :auto-upload="false"
      :multiple="true" :file-list="fileList" :on-remove="handleRemove" :on-change="uploadChange">
      <el-icon class="icon"><upload-filled /></el-icon>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    </el-upload>
    <el-progress id="progress" :percentage="percentage" :format="format" :status="status"></el-progress>
    <p>{{ finishedFormat }}/ {{ this.total }}</p>
    <el-button type="primary" @click="submitUpload">上传</el-button>
  </div>
</template>

<script>
import { UploadFilled } from '@element-plus/icons-vue'
import request from '@/apis/request'
import FileUtil from "@/utils/file"
import { useDataStore } from "@/store"
import { ElMessage } from 'element-plus'
import { ElNotification } from 'element-plus'
import { useRouter } from 'vue-router'

export default {
  components: {
    UploadFilled,
  },
  data() {
    return {
      percentage: 0,
      fileList: [],
      status: null,
      param: [],
      progressFlag: true,
      store: useDataStore(),
      router: useRouter(),
      total: 0,
      finished: 0,
    }
  },
  computed: {
    isAdmin () {
      return this.store.user.name === 'admin'
    },
    finishedFormat () {
      return  FileUtil.Byte2MB(this.finished)
    }
  },
  methods: {
    format(percentage) {
      return `${percentage}%`
    },
    submitUpload() {
      if (this.fileList.length < 1) {
        ElMessage.error('请选择文件')
      } else {
        this.postFile()
      }
    },

    upload(formData) {
      return request
        ._axios.post(`/api/upload?path=${this.store.path}`, formData, {
          headers: {
            'content-type': 'multipart/form-data'
          },
          onUploadProgress: (progressEvent)=>{
            if (progressEvent.lengthComputable) {   //是否存在进度
                const percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
                // this.progressBar = percentCompleted
                this.percentage = percentCompleted
                console.log('进度：',formData.get('fileName'), percentCompleted)
            }
          }
        })
        .then((res) => {
          if (res.status === 200) {
            return true
          } else if (res.status === 403) {
            ElNotification({
              title: '登录过期',
              message: '请求失败',
              type: 'error',
            })

            this.store.update({key: 'user', value: {}})
            this.router.replace('/login')
            return 403
          } else {
            ElNotification.error({
              title: '错误',
              message: res.message,
            })

            return false
          }
        })
        .catch((e) => {
          console.warn(e)
          return false
        })
    },

    async postFile() {
      this.updateFiles()
      const total = this.fileList.reduce((pre, cur) => {
        return pre += cur.size
      }, 0)

      this.total = `${FileUtil.Byte2MB(total)} MB`
      this.percentage = 0

      let flag = true

      for (let i = 0; i < this.fileList.length; i++) {
        const currentFile = this.fileList[i]
        const list = FileUtil.fileSplit(currentFile, 100 * 1024 * 1024)

        for (let j = 0; j < list.length; j++) {
          const params = new FormData()

          params.append('file', list[j].raw)
          params.append('total', list[j].total)
          params.append('totalSize', list[j].totalSize)
          params.append('fileName', currentFile.name)
          params.append('token', this.store.user.token)

          flag = await this.upload(params)

          if (flag) {
            this.finished += list[j].raw.size
          } else if (flag === 403) {
            // ignore
            flag = false
          } else {
            // 重试逻辑
            console.log('retry')
          }
        }
      }

      if (flag && flag !== 403) {
        this.$nextTick(() => {
          this.percentage = 0
          this.finished = 0
          this.total = 0
        })
        ElMessage.success('上传成功')
        this.$refs.upload.clearFiles()
      }
    },

    httpRequest() { },

    updateFiles() {
      this.fileList = this.fileList.sort((a, b) => a.size - b.size)
    },

    handleRemove(file, fileList) {
      ElMessage.warning(`已移除文件:  ${file.name}!`)
      this.fileList = fileList
    },
    uploadChange(file, fileList) {
      this.fileList = fileList
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

@media screen and (max-width: 900px) {
  .upload-demo {
    width: 90%;
  }

  :deep(.el-upload) {
    width: 100%;
  }
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
  max-height: 20vh;
  overflow: auto;
}

:deep(.el-upload-list__item-name) {
  max-width: 100%;
  margin: 0;
  padding: 0;
}
</style>
