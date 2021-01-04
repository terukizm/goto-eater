import Vue from "vue";
import App from "./App.vue";
// import App from "./Sample.vue";
import router from "./router";

import './tailwindcss.css';

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
