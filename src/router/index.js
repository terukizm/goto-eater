import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import VueAnalytics from "vue-analytics";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

if (process.env.VUE_APP_GOOGLE_ANALYTICS_ID) {
  Vue.use(VueAnalytics, {
    id: process.env.VUE_APP_GOOGLE_ANALYTICS_ID,
    router
  });
} else {
  console.log("[Warn] VUE_APP_GOOGLE_ANALYTICS_ID is Empty.");
}

export default router;
