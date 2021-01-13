import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token:'',
    language:'',
    data:{}
  },
  mutations: {
    handleSaveToken(state,payload){  ///   保存token
      state.token = payload
    },
    handleSaveOld(state,data){ ///   保存老人信息
      state.oldInfo = data
    }
  },
  actions: {
  },
  modules: {
  }
})
