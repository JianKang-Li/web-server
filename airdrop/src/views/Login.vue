<template>
  <div class="container-login">
    <el-form ref="loginForm" :model="form" label-width="80px" class="form-login">
      <el-form-item label="用户名" required>
        <el-input v-model.trim="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" required>
        <el-input v-model.trim="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">登录</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {login} from '@/apis'

export default {
  name: 'Login',
  data() {
    return {
      form: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    submit() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          console.log(this.form)
          login(this.form).then(res=> {
            console.log(res)
          }).catch(e => {
            console.log(e)
            this.$message({
            type: "error",
            message: '登录失败！',
          });
          })
        } else {
          return false;
        }
      })
    },

    resetForm () {
      this.$refs.loginForm.resetFields()
    }
  }
}
</script>

<style scoped>
.container-login {
  display: flex;
  align-items: center;
  justify-content: center;
}

.form-login {
  min-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
