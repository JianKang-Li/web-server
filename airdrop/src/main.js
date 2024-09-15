import { createApp } from 'vue'
import App from './App.vue'
import ElementUI from 'element-plus'
import 'element-plus/dist/index.css'
import { createPinia } from 'pinia'
import router from './router'
import initWs from './ws'

const app = createApp(App)
const pinia = createPinia()

app.use(ElementUI).use(router).use(pinia).mount('#app')
initWs()
