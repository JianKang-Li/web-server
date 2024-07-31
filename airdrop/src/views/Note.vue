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

const code = ref("")
const result = ref(false)

const init = () => {
  getNote().then(res => {
    if (res.status === 200) {
      code.value = res.context
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

  editNote(note).then(res => {
    if (res.status === 200) {
      ElNotification({
        type: 'success',
        title: '成功',
        message: '保存成功'
      })
    }
  }).catch(e => {
    ElNotification({
      type: 'error',
      title: '错误',
      message: `获取记事本内容失败${e?.message || ''}`
    })
  }).finally(() => {
    init()
  })
}
</script>
