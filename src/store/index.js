import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    // 左袖メニューの選択状態と、地図のレイヤーの表示状態
    // genre[1-10].geojsonと対応させるため、layers[0]はnullを入れている
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
