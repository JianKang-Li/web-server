import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'
import initWs from './ws'
import './assets/css/default.css'

const app = createApp(App)
const pinia = createPinia()

app.use(router).use(pinia).mount('#app')
initWs()
