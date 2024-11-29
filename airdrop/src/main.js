import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'
import initWs from './ws'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import './assets/css/default.css'

const app = createApp(App)
const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)

app.use(pinia).use(router).mount('#app')
initWs()
