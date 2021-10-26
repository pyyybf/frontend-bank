import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import user from './modules/user'
import paper from './modules/paper'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    paper,
  },
  getters
})

export default store
