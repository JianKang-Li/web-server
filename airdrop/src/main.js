import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from "./store"


Vue.config.productionTip = false
Vue.prototype.Dev = false;
Vue.use(ElementUI)

import { getIP } from "@/apis/index"
import router from './router'

new Vue({
  render: h => h(App),
  store,
  router,
  created() {
    getIP().then(res => {
      let ip = res.ip
      let port = res.port
      Vue.prototype.ip = ip
      let ws = new WebSocket(`ws://${ip}:${port}`)
      ws.onopen = () => {
        console.log('ws open');
      }
      ws.onclose = () => {
        this.$message.error('WebSocket已断开')
      }
      Vue.prototype.ws = ws
    })
  }
}).$mount('#app')