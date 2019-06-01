<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view class="child-view"></router-view>
    </transition>
    <cube-tab-bar v-model="selectedLabel" @change="changeHandler">
      <cube-tab v-for="(item, index) in tabs" :label="item.value" :key="index" :icon="item.icon">
        <span>{{item.label}}</span>
        <span class="badge" v-if="showBadge(item.label)">{{cartTotal}}</span>
      </cube-tab>
    </cube-tab-bar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      selectedLabel: "/", // 默认选中的页签
      tabs: [
        {
          label: "Home",
          value: "/",
          icon: "cubeic-home"
        },
        {
          label: "Cart",
          value: "/cart",
          icon: "cubeic-mall"
        },
        {
          label: "Me",
          value: "/login",
          icon: "cubeic-person"
        }
      ],
      transitionName: "slide-right"
    };
  },
  watch: {
    $route(to, from) {
      this.selectedLabel = to.path;
      if (to.meta.index < from.meta.index) {
        this.transitionName = "slide-right";
      } else {
        this.transitionName = "slide-left";
      }
    }
  },
  created() {
    this.selectedLabel = this.$route.path;
  },
  methods: {
    logout() {
      this.$http.get("/api/logout");
    },
    changeHandler(val) {
      this.$router.push(val);
    },
    showBadge(label){
     return label == "Cart" && this.cartTotal > 0;
    }
  },
  computed: {
    ...mapGetters(["isLogin", "cartTotal"])
  }
};
</script>

<style lang="scss">
.slide-left-leave-active,
.slide-right-enter {
  transform: translateX(-100%);
}
.slide-left-enter,
.slide-right-leave-active {
  transform: translateX(100%);
}
.child-view {
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  transition: all 0.3s ease;
  padding-bottom: 40px;
  min-height: 100%;
}
.cube-tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  border-top: 1px solid #eee;
  z-index: 99;
}
.cube-tab span{
  display: block;
}
span.badge {
    width: 16px;
    height: 16px;
    background-color: #de3529;
    color: white;
    border-radius: 50%;
    font-size: 12px;
    line-height: 16px;
    text-align: center;
    position: absolute;
    top: 2px;
    left: 52%;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
