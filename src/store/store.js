import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    count: 50,
  },
  getters: {
    todo: state => {
      if(state.count >= 100) {
        return '水开'
      }else if(state.count){
        return '水未开'
      }
    }
  },
  mutations: {
    add(state, n){
      state.count+= n;
    },
    reduce(state, n){
      state.count-= n;
    },
    boom(state){
      state.count = 100;
    },
    cold(state){
      state.count = 90;
    }
  },
  actions: {
    boom ({ commit }) {
      setTimeout(() => {
        commit('boom')
      }, 1000)
    },
  },
  modules: {

  }
})