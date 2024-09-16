<template>
  <div id="app">
    <el-container>
      <AsideBar></AsideBar>
      <el-header>
        <Ahead />
      </el-header>
      <el-main class="main">
        <router-view> </router-view>
      </el-main>
      <el-footer>
        <div class="footer">
          <p>
            Design By
            <el-link href="https://github.com/JianKang-Li" target="_blank" type="primary">ljk</el-link>
          </p>
        </div>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import Ahead from "./components/Ahead.vue"
import AsideBar from './components/AsideBar.vue'
export default {
  name: "App",
  components: { Ahead, AsideBar }
}
</script>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

a {
  text-decoration: none;
}

.el-container.is-vertical {
  width: 100%;
}

.footer {
  text-align: center;
}

.footer a {
  font-size: 1rem;
}

.main {
  height: calc(100vh - 140px);
}
</style>
