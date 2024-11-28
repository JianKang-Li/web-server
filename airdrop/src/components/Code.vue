<template>
  <div class="opt mb10">
    <el-button type="primary" v-show="isEdit" @click="save">保存</el-button>
    <el-button type="danger" v-show="isEdit" @click="cancel">取消</el-button>
    <el-button type="primary" v-show="!isEdit" @click="edit">编辑</el-button>
  </div>
  <div class="code-container" v-show="!isEdit" v-html="tranCodeValue">
  </div>

  <div v-show="isEdit">
    <el-input type="textarea" v-model="code" autosize>
    </el-input>
  </div>
</template>
<script setup>
import { ref, watch } from "vue"

const props = defineProps({
  code: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'txt'
  },
  result: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['change'])
const code = ref(props.code)
const isEdit = ref(false)
const tranCodeValue = ref(props.code)

const tranCode = () => {
  const map = {
    ">": "&gt;", // 必须在 html 元素前
    "<": "&lt;",
    '"': '&quot;',
    " ": "&nbsp;",
    "\n": "<br/>"
  }

  let tran = code.value

  Object.keys(map).forEach(key => {
    tran = tran.replaceAll(key, map[key])
  })

  tranCodeValue.value = tran
}

const edit = () => {
  isEdit.value = true
}

watch(() => props.code, (val) => {
  code.value = val
  tranCode()
}, {
  immediate: true
})

const cancel = () => {
  code.value = props.code
  isEdit.value = false
}

const save = () => {
  tranCode()
  if (code.value !== props.code) {
    emit('change', code.value)
  }
  isEdit.value = false
}
</script>
<style scoped>
.code-container {
  background-color: #eee;
  padding: 1rem;
  border-radius: 10px;
}
</style>
