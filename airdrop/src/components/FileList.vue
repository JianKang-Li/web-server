<template>
  <div class="table">
    <div class="path">
      <el-button @click="back" icon="el-icon-back"></el-button>
      <el-input :value="currentPath" class="path-input"></el-input>
      <el-button @click="createDir" icon="el-icon-folder-add" title="新建文件夹"></el-button>
    </div>
    <el-table :data="this.$store.state.menu" style="width: 100%">
      <el-table-column prop="index" label="序号"> </el-table-column>
      <el-table-column prop="filename" label="文件名" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <a v-if="scope.row.isDir" href="javascript:" @click="go(scope.row.filename)">{{ scope.row.filename }}</a>
          <span v-else>{{ scope.row.filename }}</span>
        </template>
      </el-table-column>
      <el-table-column label="下载">
        <template slot-scope="scope">
          <a v-show="!scope.row.isDir" :download="scope.row.filename"
            :href="'./public/files/' + scope.row.filename">下载</a>
        </template>
      </el-table-column>
      <el-table-column label="预览">
        <template slot-scope="scope">
          <el-button type="primary" size="default" v-show="!scope.row.isDir" @click="
            preview(scope.row.filename, `/public/files/${scope.row.filename}`)
            ">预览</el-button>
        </template>
      </el-table-column>
      <el-table-column label="删除">
        <template slot-scope="scope">
          <el-button v-show="!scope.row.isDir" type="danger" size="default"
            @click="open(scope.row.filename)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="删除确认" :visible.sync="DeleteDialog" width="fit-content" center>
      <span>是否确认删除文件{{ file }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="DeleteDialog = false">取 消</el-button>
        <el-button type="danger" @click="Delete()">确 定</el-button>
      </span>
    </el-dialog>
    <div>
      <el-dialog title="预览窗口" :visible.sync="centerDialogVisible" width="60%" center @close="Pclose">
        <img :src="url" alt="" v-if="this.pics.includes(this.type)" class="perv" />
        <audio :src="url" v-else-if="this.audios.includes(this.type)" controls class="perv" ref="audio"></audio>
        <video :src="url" v-else-if="this.videos.includes(this.type)" controls class="perv" ref="video"></video>
        <iframe v-else-if="this.texts.includes(this.type)" :src="url" class="perv"></iframe>
        <object :data="url" type="application/pdf" class="perv" v-else-if="/pdf/.test(this.type)"></object>
        <span v-else class="perv">浏览器不支持此类型文件!</span>
      </el-dialog>
    </div>

    <CreateDir ref="dir" :path="currentPath"></CreateDir>
  </div>
</template>

<script lang="js">
import { DeleteF, getInfo, getIP } from "@/apis";
import CreateDir from "./CreateDir.vue";
export default {
  name: "App",
  components: {
    CreateDir
  },
  data() {
    return {
      url: "",
      centerDialogVisible: false,
      DeleteDialog: false,
      file: "",
      type: "",
      pics: ['jpg', 'png', 'webp', 'jpeg', 'bmp', 'gif', 'apng', 'avif', 'ico'],
      audios: ['mp3', 'ogg', 'wav'],
      videos: ['mp4', 'webm'],
      texts: ['txt', 'json', 'md', 'html'],
      reader: null,
      currentPath: '',
      ip: '',
      port: ''
    };
  },
  computed: {
    lastPath() {
      const arr = this.currentPath.split('/')
      arr.pop()
      return arr.join('/')
    }
  },
  methods: {
    getMenu() {
      getInfo(this.currentPath).then((res) => {
        this.$store.dispatch("updata", { key: 'menu', value: res })
      })
    },

    refresh(path) {
      this.currentPath = path
      this.$store.dispatch("updata", { key: 'path', value: this.currentPath })
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

    Pclose() {
      if (this.$refs.audio) {
        this.$refs.audio.pause();
      } else if (this.$refs.video) {
        this.$refs.video.pause()
      }
    },

    preview(filename, value) {
      let mat = filename.match(/\.\w*$/g)[0]
      this.type = mat.replace(".", "")
      if (this.Dev) {
        this.url = this.globalUrl + value
      } else {
        this.url = `http://${this.ip}:${this.port}/public/files/${this.currentPath}/${encodeURIComponent(filename)}`
      }
      this.centerDialogVisible = true
    },

    Delete() {
      DeleteF(this.file, this.currentPath).then(
        (res) => {
          if (res.status === 200) {
            this.$message({
              type: "success",
              message: `${res.msg}`,
            });
            this.ws.send('delete')
          } else {
            this.$message({
              type: "error",
              message: `${res.msg}`,
            });
          }
        })
        .catch((error) => {
          this.$message({
            type: "error",
            message: `${error}`,
          });
        });
      this.getMenu();
      this.DeleteDialog = false
    },

    open(filename) {
      this.file = filename
      this.DeleteDialog = true
    },
  },
  async mounted() {
    await getIP().then(res => {
      this.ip = res.ip
      this.port = res.port
      this.wsport = res.wsport
      let ws = new WebSocket(`ws://${this.ip}:${this.wsport}`)
      ws.onopen = () => {
        console.log('ws open');
      }
      ws.onclose = () => {
        this.$message.error('WebSocket已断开')
      }
      this.ws = ws
    }).then(() => {
      this.getMenu()
      this.ws.onmessage = (data) => {
        const msg = data.data
        if (msg === 'upload' || msg === 'delete') {
          this.getMenu()
        }
      }
    }).catch(() => {
      window.timer = setInterval(() => {
        this.getMenu()
      }, 3000)
    })
  },

  beforeDestroy() {
    clearInterval(window.timer)
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: #409eff;
}

.perv {
  width: 100%;
  height: 60vh;
  object-fit: contain;
}

.path {
  margin-top: 10px;
  display: flex;
}
</style>
