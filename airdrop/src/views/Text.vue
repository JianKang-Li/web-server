<template>
  <div>
    <div class="mt10">
      <el-input :autosize="{ minRows: 6, maxRows: 10 }" type="textarea" v-model="text"></el-input>
      <div class="btns">
        <el-button type="primary" @click="postText">发送</el-button>
        <el-button type="danger" @click="clean">清除</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { postT, cleanT } from '@/apis'
import { useDataStore } from '@/store'
import { ElNotification } from 'element-plus'
import { useRouter } from 'vue-router'

export default {
  data() {
    return {
      text: '',
      store: useDataStore(),
      router: useRouter()
    }
  },
  methods: {
    postText() {
      let data = {
        text: this.text,
        token: this.store.user.token
      }

      postT(data).then((res) => {
        // console.log(res);
        if (res.status === 200) {
          ElNotification({
            title: '成功',
            message: '发送成功',
            type: 'success',
          })
        } else if (res.status === 403) {
          ElNotification({
            title: '登录过期',
            message: '发送失败',
            type: 'error',
          })

          this.store.update({key: 'user', value: {}})
          this.router.replace('/login')
        }
      })
    },
    write(msg) {
      this.text += msg
    },
    clear() {
      this.text = ''
    },
    clean() {
      cleanT(this.store.user.token).then((res) => {
        if (res.status === 200) {
          ElNotification({
            title: '成功',
            message: '清除成功',
            type: 'success',
          })
          this.clear()
        } else if (res.status === 403) {
          ElNotification({
            title: '登录过期',
            message: '请求失败',
            type: 'error',
          })

          this.store.update({key: 'user', value: {}})
          this.router.replace('/login')
        }
      })
    },
  },
  mounted() {
    this.store.wsObj.ws.onmessage = (data) => {
      const msg = JSON.parse(data.data)

      if (msg.status === 'write') {
        this.clear()
        this.write(msg.content)
      } else if (msg.status === 'clear') {
        this.clear()
      }
    }
  },
}
</script>

<style scoped>
.btns {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
}
</style>
