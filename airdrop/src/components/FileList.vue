<template>
  <div class="table">
    <div class="path">
      <el-button @click="back"><el-icon>
          <ELBack></ELBack>
        </el-icon></el-button>
      <el-input :model-value="currentPath" class="path-input"></el-input>
      <el-button @click="createDir" title="新建文件夹">
        <el-icon>
          <folder-add></folder-add>
        </el-icon>
      </el-button>
    </div>
    <el-table :data="store.menu" style="width: 100%">
      <el-table-column prop="index" label="序号"> </el-table-column>
      <el-table-column label="文件名" :show-overflow-tooltip="true">
        <template #default="scope">
          <div class="sm">
            <el-link :underline="false" v-if="scope.row.isDir" href="javascript:" type="primary"
              @click="go(scope.row.filename)">{{
                scope.row.filename
              }}</el-link>
            <span v-else>{{ scope.row.filename }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="下载">
        <template #default="scope">
          <a v-show="!scope.row.isDir" :download="scope.row.filename"
            :href="`http://${this.ip}:${this.port}/file/${currentPath}/${scope.row.filename}`">下载</a>
        </template>
      </el-table-column>
      <el-table-column label="预览">
        <template #default="scope">
          <el-button type="primary" size="small" v-show="!scope.row.isDir" @click="
            previewFile(scope.row.filename)
            ">预览</el-button>
        </template>
      </el-table-column>
      <el-table-column label="删除">
        <template #default="scope">
          <el-button v-show="!scope.row.isDir" type="danger" size="small"
            @click="open(scope.row.filename)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="删除确认" v-model="DeleteDialog" width="fit-content" center>
      <span>是否确认删除文件{{ file }}</span>
      <template #footer>
        <el-button @click="DeleteDialog = false">取 消</el-button>
        <el-button type="danger" @click="Delete()">确 定</el-button>
      </template>
    </el-dialog>
    <createDirModal ref="dir" :path="currentPath"></createDirModal>
    <Preview :filename="file" ref="privewModal"></Preview>
  </div>
</template>

<script>
import { Back as ELBack, FolderAdd } from '@element-plus/icons-vue'
import { DeleteF, getInfo } from "@/apis"
import createDirModal from "./CreateDir.vue"
import { useDataStore } from '@/store'
import Preview from './Preview.vue'

export default {
  data() {
    return {
      url: "",
      DeleteDialog: false,
      file: "",
      reader: null,
      currentPath: '',
      store: useDataStore(),
      ip: '',
      port: ''
    }
  },
  components: {
    createDirModal,
    FolderAdd,
    ELBack,
    Preview
  },
  computed: {
    lastPath() {
      const arr = this.currentPath.split('/')
      arr.pop()
      return arr.join('/')
    },
  },
  methods: {
    getMenu() {
      getInfo(this.currentPath).then((res) => {
        this.store.update({ key: 'menu', value: res })
      })
    },

    refresh(path) {
      this.currentPath = path
      this.store.update({ key: 'path', value: this.currentPath })
      this.getMenu()
    },

    go(dir) {
      const path = `${this.currentPath}/${dir}`
      this.refresh(path)
    },

    back() {
      this.refresh(this.lastPath)
    },

    createDir() {
      this.$refs.dir.show()
    },

    previewFile(filename) {
      this.$refs.privewModal.showPreview(filename)
    },

    Delete() {
      DeleteF(this.file, this.currentPath).then(
        (res) => {
          if (res.status === 200) {
            this.$message({
              type: "success",
              message: `${res.msg}`,
            })
            this.ws.send('delete')
          } else {
            this.$message({
              type: "error",
              message: `${res.msg}`,
            })
          }
        })
        .catch((error) => {
          this.$message({
            type: "error",
            message: `${error}`,
          })
        })
      this.getMenu()
      this.DeleteDialog = false
    },

    open(filename) {
      this.file = filename
      this.DeleteDialog = true
    },
  },
  mounted() {
    try {
      this.ws = this.store.wsObj.ws
      this.ip = this.store.wsObj.ip
      this.port = this.store.wsObj.port
      this.getMenu()
      this.ws.onmessage = (data) => {
        const msg = JSON.parse(data.data)
        if (msg.status === 'upload' || msg.status === 'delete') {
          this.getMenu()
        }
      }
    }
    catch (e) {
      console.log(e)
      window.timer = setInterval(() => {
        this.getMenu()
      }, 3000)
    }
  },
  beforeUnmount() {
    clearInterval(window.timer)
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
  color: #409eff;
}

.path {
  margin-top: 10px;
  display: flex;
}

.sm {
  overflow: hidden;
  white-space: nowrap;
  max-width: 20vw;
  text-overflow: ellipsis;
}
</style>
