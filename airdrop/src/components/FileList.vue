<template>
  <div class="table">
    <el-table :data="this.$store.state.menu" style="width: 100%">
      <el-table-column prop="index" label="序号"> </el-table-column>
      <el-table-column
        prop="filename"
        label="文件名"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column label="下载">
        <template slot-scope="scope">
          <a
            :download="scope.row.filename"
            :href="'./public/files/' + scope.row.filename"
            >下载</a
          >
        </template>
      </el-table-column>
      <el-table-column label="预览">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="default"
            @click="
              preview(scope.row.filename, '/public/files/' + scope.row.filename)
            "
            >预览</el-button
          >
        </template>
      </el-table-column>
      <el-table-column label="删除">
        <template slot-scope="scope">
          <el-button
            type="danger"
            size="default"
            @click="open(scope.row.filename)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      title="删除确认"
      :visible.sync="DeleteDialog"
      width="fit-content"
      center
    >
      <span>是否确认删除文件{{ file }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="DeleteDialog = false">取 消</el-button>
        <el-button type="danger" @click="Delete()">确 定</el-button>
      </span>
    </el-dialog>
    <div>
      <el-dialog
        title="预览窗口"
        :visible.sync="centerDialogVisible"
        width="60%"
        center
        @close="Pclose"
      >
        <img
          :src="url"
          alt=""
          v-if="this.pics.includes(this.type)"
          class="perv"
        />
        <audio
          :src="url"
          v-else-if="this.audios.includes(this.type)"
          controls
          class="perv"
          ref="audio"
        ></audio>
        <video
          :src="url"
          v-else-if="this.videos.includes(this.type)"
          controls
          class="perv"
          ref="video"
        ></video>
        <iframe
          v-else-if="this.texts.includes(this.type)"
          :src="url"
          class="perv"
        ></iframe>
        <object
          :data="url"
          type="application/pdf"
          class="perv"
          v-else-if="/pdf/.test(this.type)"
        ></object>
        <span v-else class="perv">浏览器不支持此类型文件!</span>
      </el-dialog>
    </div>
  </div>
</template>

<script lang="js">
import { DeleteF, getInfo, getIP } from "@/apis";
export default {
  name: "App",
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
      texts: ['txt','json','md','html'],
      reader: null
    };
  },
  methods: {
    getMenu() {
      getInfo().then((res) => {
        // console.log('getInfo',res);
        this.$store.dispatch("updata", res)
      })
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
        this.url = 'http://'+this.ip+':8888/public/files/'+encodeURIComponent(filename)
      }
      this.centerDialogVisible = true
    },

    Delete() {
      DeleteF(this.file).then(
        (res) => {
          this.$message({
            type: "success",
            message: `${res}`,
          });
          this.ws.send('delete')
        })
        .catch((error) => {
          this.$message({
            type: "warning",
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
      let ip = res.ip
      let port = res.port
      let ws = new WebSocket(`ws://${ip}:${port}`)
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
        // console.log(data.data);
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
</style>
