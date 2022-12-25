<template>
  <div class="upload">
    <el-upload
      ref="upload"
      class="upload-demo"
      drag
      action=""
      :http-request="httpRequest"
      :auto-upload="false"
      :on-progress="proUpdata"
      name="file"
      :multiple="true"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    </el-upload>
    <el-progress
      id="progress"
      :percentage="percentage"
      :format="format"
      :status="status"
    ></el-progress>
    <el-button type="primary" size="default" @click="submitUpload"
      >上传</el-button
    >
  </div>
</template>

<script>
import request from "@/apis/request";
import { getInfo } from "@/apis";
export default {
  data() {
    return {
      percentage: 0,
      fileList: [],
      status: null,
    };
  },
  methods: {
    format(percentage) {
      return `${percentage}%`;
    },
    submitUpload() {
      this.$refs.upload.submit();
    },

    proUpdata(event) {
      console.log(event);
      this.percentage = parseInt(event.percent); // 动态获取文件上传进度
      console.log(this.percentage);
      if (this.percentage >= 100) {
        this.percentage = 100;
        setTimeout(() => {
          this.percentage = 0;
        }, 1000); // 一秒后关闭进度条
      }
    },

    httpRequest(params) {
      // console.log(params.file); //拿到上传的文件
      var formdata = new FormData();
      formdata.append("filename", params.file);
      request
        ._axios({
          method: "post",
          url: "/upload",
          data: formdata,
          onUploadProgress: (progressEvent) => {
            const complete = parseInt(
              (progressEvent.loaded / progressEvent.total) * 100
            );
            this.percentage = complete;
          },
        })
        .then((res) => {
          if (res.data.status === 200) {
            this.$notify({
              title: "成功",
              message: "文件上传成功",
              type: "success",
            });
            setTimeout(() => {
              this.percentage = 0;
            }, 1000);
            this.ws.send("update");
            getInfo().then((res) => {
              this.$store.dispatch("updata", res.data);
            });
          } else {
            this.$notify.error({
              title: "错误",
              message: res.data.message,
            });
          }
          this.$refs.upload.clearFiles();
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  watch: {
    status() {
      return this.percentage === 100 ? "success" : "";
    },
  },

  mounted() {
    if (this.ws.readyState === 3) {
      window.setInterval(function () {
        getInfo();
      });
    }
  },
};
</script>

<style scoped>
.upload {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.upload-demo {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

#progress {
  width: 70vw;
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
