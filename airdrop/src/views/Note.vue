<template>
  <div class="container">
    <Code :code="code" @change="changeNote"></Code>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue"
import { getNote, editNote } from "../apis"
import Code from '../components/Code.vue'
import { ElNotification } from 'element-plus'
import { useRouter } from "vue-router"
import {useDataStore } from '@/store'

const code = ref("")
const result = ref(false)
const router = useRouter
const store = useDataStore()

const init = () => {
  getNote(store.user.token).then(res => {
    if (res.status === 200) {
      code.value = res.context
    } else if (res.status === 403) {
      ElNotification({
        title: '登录过期',
        message: '请求失败',
        type: 'error',
      })

      store.update({key: 'user', value: {}})
      router.replace('/login')
    }
  }).catch(e => {
    ElNotification({
      type: 'error',
      title: '错误',
      message: `获取记事本内容失败${e?.message || ''}`
    })
  })
}

onMounted(() => {
  init()
})

const changeNote = (note) => {
  result.value = true

  editNote({note, token: store.user.token}).then(res => {
    if (res.status === 200) {
      ElNotification({
        type: 'success',
        title: '成功',
        message: '保存成功'
      })
    } else if (res.status === 403) {
      ElNotification({
        title: '登录过期',
        message: '请求失败',
        type: 'error',
      })

      this.store.update({key: 'user', value: {}})
      router.replace('/login')
    }
  }).catch(e => {
    ElNotification({
      type: 'error',
      title: '错误',
      message: `获取记事本内容失败${e?.message || ''}`
    })
  })
}
</script>
