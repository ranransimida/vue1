import Vue from "vue";
import Router from "vue-router";
import store from "./store";
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import Cart from "./views/Cart.vue";
import History from './utils/history'

Vue.use(Router);
Vue.use(History);

// 给Router的原型 扩展 一个goBack方法
Router.prototype.goBack = function(){
  this.isBack = true;   // 给该方法一个标识符，后面通过该标识符可以知道这是后退方法
  this.back();
}

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      meta: { index: 1 }
    },
    {
      path: "/cart",
      name: "cart",
      component: Cart,
      meta: { index: 2 }
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: { index: 3 }
    },
    {
      path: "/about",
      name: "about",
      meta: { auth: true }, // 需要守卫的路由
      component: () => import("./views/About.vue")
    }
  ]
});
router.beforeEach((to, from, next) => {
  if (to.meta.auth) {
    if (store.state.token) {
      next();
    } else {
      next({ name: "login", query: { redirect: to.path } });
    }
  } else {
    next();
  }
});
// 在afterEach里做历史记录
router.afterEach( to => {
  if(router.isBack){    // 后退
    History.pop();
    router.isBack = false;
  } else {
    History.push(to.path);
  }
})
export default router;
