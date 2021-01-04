import Vue from "vue";
import App from "./App.vue";
// import App from "./Sample.vue";
import router from "./router";

import "./tailwindcss.css";

import LoadScript from "vue-plugin-load-script";
Vue.use(LoadScript);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
