import Vue from 'vue'
import Vuex from 'vuex'
import * as auth from '@/utils/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: auth.getUser() // 从缓存中
  },
  mutations: {
    updateUser (state, payload) {
      state.user = payload.user
      auth.setUser(payload.user)
    },
    clearUser (state) {
      state.user = {}
      auth.delUser()
    }
  },
  actions: {
  },
  modules: {
  }
})
