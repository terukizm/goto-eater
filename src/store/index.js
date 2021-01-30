import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    layers: [null, true, true, true, true, true, true, true, true, true, true]
  },
  getters: {
    layers: state => state.layers
  },
  mutations: {
    updateLayers(state, value) {
      state.layers = value;
    }
  },
  actions: {
    setLayers({ commit }, value) {
      commit("updateLayers", value);
    }
  }
});

export default store;
