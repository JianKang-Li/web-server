<template>
  <div class='menu-container'>
    <ul v-show="mode" class="menu">
      <li v-for="(item, index) in menu" :key="index" :index="item.index" class="menu-item">
        <router-link :to="item.to" v-if="item.to"><el-button type="primary">{{ item.title }}</el-button></router-link>
        <el-button type="primary" @click="item.action" v-else>{{ item.title }}</el-button>
      </li>
    </ul>

    <div @click="changeMode">
      <el-button type="primary">
        <el-icon>
          <Menu />
        </el-icon>
      </el-button>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { Menu } from "@element-plus/icons-vue"
import { useDataStore} from '@/store'
import { useRouter } from 'vue-router'

const store = useDataStore()
const router = useRouter()

const layout = () => {
  store.update({key: 'user', value: {}})
  router.replace('/login')
}

const mode = ref(false)
const menu = [
  {
    to: '/',
    title: '文件传输',
    index: '0'
  },
  {
    to: '/text',
    title: '文本同传',
    index: '1'
  },
  // note 需要适配用户
  // {
  //   to: '/note',
  //   title: '记事本',
  //   index: '2'
  // }
   {
    title: '退出',
    index: '3',
    action: layout
  }
]

const changeMode = () => {
  mode.value = !mode.value
}
</script>

<style scoped>
.menu-container {
  position: fixed;
  bottom: 60px;
  z-index: 100;
  margin-left: 20px;
  background-color: transparent;
  height: fit-content;
  width: fit-content;
}

.menu {
  list-style: none;
  padding: 0;
}

.menu-item {
  margin-top: 1rem;
}
</style>
