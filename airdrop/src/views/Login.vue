<template>
  <div class="w df container">
    <el-card class="loginCard">
      <el-form :model="form" label-position="right" label-width="auto">
        <el-form-item label="用户名">
          <el-input v-model="form.username" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" type="password" />
        </el-form-item>
        <div class="w df">
          <el-button @click="login" type="primary">登录</el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { sysLogin } from '@/apis'
import { useRouter } from 'vue-router'
import { useDataStore } from '@/store'

const form = ref({
  username: '',
  password: ''
})
const router = useRouter()
const store = useDataStore()

const login = () => {
  if (!form.value.username || !form.value.password) {
    return
  }
  return sysLogin(form.value.username, form.value.password)
    .then(res => {
      if (res.status === 200) {
        store.update({ key: 'user', value: res.user })
        router.push({ path: '/file' })
      }
    })
}
</script>

<style scoped>
.loginCard {
  padding: 2rem;
}
</style>
