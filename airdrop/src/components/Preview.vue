<template>
  <div>
    <el-dialog title="预览窗口" v-model="centerDialogVisible" width="60%" center @close="beforeClose">
      <img :src="url" alt="文件预览" v-if="FileTypes.pics.includes(type)" class="perv" />
      <audio :src="url" v-else-if="FileTypes.audios.includes(type)" controls class="perv" ref="audio"></audio>
      <video :src="url" v-else-if="FileTypes.videos.includes(type)" controls class="perv" ref="video"></video>
      <iframe v-else-if="FileTypes.text.includes(type)" :src="url" class="perv"></iframe>
      <object v-else-if="/pdf/.test(type)" :data="url" type="application/pdf" class="perv"></object>
      <span v-else class="perv">浏览器不支持此类型文件!</span>
    </el-dialog>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue'
import { useDataStore } from '@/store'

const store = useDataStore()
const centerDialogVisible = ref(false)
const fileName = ref('')
const path = ref('')
const audio = ref(null)
const video = ref(null)

const beforeClose = () => {
  if (audio.value) {
    audio.value.pause();
  } else if (video.value) {
    video.value.pause()
  }

  centerDialogVisible.value = false
}

const FileTypes = {
  pics: ['jpg', 'png', 'webp', 'jpeg', 'bmp', 'gif', 'apng', 'avif', 'ico'],
  audios: ['mp3', 'ogg', 'wav'],
  videos: ['mp4', 'webm'],
  text: ['txt', 'json', 'md', 'html'],
}

const url = computed(() => {
  return `http://${store.wsObj.ip}:${store.wsObj.port}/file/${path.value}/${fileName.value}`
})

const type = computed(() => {
  let mat = fileName.value.match(/\.\w*$/g)[0]
  return mat.replace(".", "")
})

const showPreview = (file) => {
  centerDialogVisible.value = true
  fileName.value = file
}

defineExpose({
  showPreview
})
</script>

<style scoped>
.perv {
  width: 100%;
  height: 60vh;
  object-fit: contain;
}
</style>
