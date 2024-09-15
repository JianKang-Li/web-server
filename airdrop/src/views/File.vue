<template>
  <div>
    <router-link to="/text"><el-button type="primary">文本上传</el-button></router-link>
    <UpLoad />
    <FileList />
  </div>
</template>

<script>
import UpLoad from '@/components/UpLoad.vue'
import FileList from '@/components/FileList.vue'
export default {
  components: { UpLoad, FileList },
}
</script>
