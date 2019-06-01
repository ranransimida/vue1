import Vue from "vue";
import "./cube-ui";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import interceptor from "./http-interceptor";
import myHeader from "./components/Header.vue";

Vue.config.productionTip = false;
Vue.prototype.$http = axios;

Vue.component("my-header", myHeader);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
