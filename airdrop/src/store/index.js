import Vue from "vue";
import Vuex from "vuex"
Vue.use(Vuex)

const store = new Vuex.Store({

  state: {
    menu: []
  },
  actions: {
    updata(context, value) {
      // console.log(value);
      context.commit('flash', value)
    }
  },
  mutations: {
    flash(state, value) {
      state.menu = value
    }
  }
})

export default store