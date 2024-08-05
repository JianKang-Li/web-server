import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from "./store"


Vue.config.productionTip = false
Vue.prototype.Dev = false;
Vue.use(ElementUI)
import router from './router'

new Vue({
  render: h => h(App),
  store,
  router,
}).$mount('#app')