import Vue from "vue";
import App from "./App.vue";
import routes from "./routes";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import VueRouter from "vue-router";
import startQiankun from "./micro";
Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(Antd);

startQiankun();

const router = new VueRouter({
  mode: "hash",
  routes,
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#main-app");
