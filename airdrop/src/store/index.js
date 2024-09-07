import Vue from "vue";
import Vuex from "vuex"
Vue.use(Vuex)

const store = new Vuex.Store({

  state: {
    menu: [],
    path: ''
  },
  actions: {
    updata(context, { key, value }) {
      context.commit('flash', { key, value })
    }
  },
  mutations: {
    flash(state, { key, value }) {
      state[key] = value
    }
  }
})

export default store