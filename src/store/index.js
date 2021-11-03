import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import user from './modules/user'
import paper from './modules/paper'
import appendix from './modules/appendix'
import analyse from './modules/analyse'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    paper,
    appendix,
    analyse,
  },
  getters
})

export default store
