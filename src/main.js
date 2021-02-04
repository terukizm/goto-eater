import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./tailwindcss.css";

import LoadScript from "vue-plugin-load-script";
Vue.use(LoadScript);

import VueSimpleAlert from "vue-simple-alert";
Vue.use(VueSimpleAlert);

import VueCookies from "vue-cookies";
Vue.use(VueCookies);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
