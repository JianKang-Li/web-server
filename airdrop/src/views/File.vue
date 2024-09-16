<template>
  <div>
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
