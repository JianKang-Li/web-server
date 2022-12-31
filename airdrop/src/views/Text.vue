<template>
  <div>
    <router-link to="/"
      ><el-button type="primary" size="mini">文件传输</el-button></router-link
    >
    <div class="content">
      <el-input
        class="control_text"
        resize="none"
        :autosize="{ minRows: 6, maxRows: 10 }"
        type="textarea"
        v-model="text"
      ></el-input>
      <div class="btns">
        <el-button type="primary" @click="postText">发送</el-button>
        <el-button type="danger" @click="clean">清除</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { postT, cleanT } from "@/apis";
export default {
  data() {
    return {
      text: "",
    };
  },
  methods: {
    postText() {
      let data = {
        text: this.text,
      };
      postT(data).then((res) => {
        // console.log(res);
        if (res.status === 200) {
          this.$notify({
            title: "成功",
            message: "发送成功",
            type: "success",
          });
        }
      });
    },
    write(msg) {
      this.text += msg;
    },
    clear() {
      this.text = "";
    },
    clean() {
      cleanT().then((res) => {
        // console.log(res);
        if (res.status === 200) {
          this.$notify({
            title: "成功",
            message: "清除成功",
            type: "success",
          });
          this.clear();
        }
      });
    },
  },
  mounted() {
    this.ws.onmessage = (data) => {
      // console.log(data.data);
      const msg = JSON.parse(data.data);
      if (msg.status === "write") {
        this.clear();
        this.write(msg.content);
      } else if (msg.status === "clear") {
        this.clear();
      }
    };
  },
};
</script>
<style scoped>
div {
  width: 100%;
  height: 100%;
}

.content {
  width: 100%;
  height: 30%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 0.3rem;
}

.control_text {
  width: 80%;
  height: 100%;
}

.btns {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
}
</style>
