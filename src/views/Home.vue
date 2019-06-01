<template>
  <div class="home">
    <my-header title="思密达的项目"></my-header>
    <cube-slide ref="slide" :data="sliders" :interval="2000">
      <cube-slide-item
        v-for="(item, index) in sliders"
        :key="index"
        @click.native="clickHandler(item, index)"
      >
        <router-link :to="`/detail${item.id}`">
          <img :src="item.img" class="slider">
        </router-link>
      </cube-slide-item>
    </cube-slide>

    <cube-button @click="showDrawer">Show Drawer</cube-button>
    <cube-drawer ref="drawer" title="请选择" :data="[drawerList]" @select="selectHandler"></cube-drawer>

    <goods-list :goods="filterGoods" @addCart="onAddCart"></goods-list>

    <!-- <div class="ball-wrap">
      <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
        <div class="ball" v-show="ball.show"></div>
      </transition>
    </div> -->
  </div>
</template>

<script>
import GoodsList from "@/components/GoodsList.vue";
const labels = {
  fe: "前端",
  python: "python",
  java: "java",
  bigdata: "大数据",
  ai: "人工智能"
};
export default {
  name: "home",
  components: {
    GoodsList
  },
  data() {
    return {
      sliders: [],
      goods: [],
      keys: [],
      selectedKeys: [],
      ball: {
        show: true,
        el: null    //目标dom的引用
      }
    };
  },
  async created() {
    const res = await this.$http.get("/api/goods");
    const {
      data: { data: goods, slider, keys } // 解构出 data里的data（并更名为goods）和 slider 和 keys
    } = res;
    this.sliders = slider;
    this.goods = goods;
    this.keys = keys;
    if(this.$store.state.selectedVal){
      this.selectedKeys = [...this.$store.state.selectedVal];
    } else {
      this.selectedKeys = [...this.keys];
    }
  },
  computed: {
    filterGoods() {
      let ret = [];
      this.selectedKeys.forEach(v => {
        ret = ret.concat(this.goods[v]);
      });
      return ret;
    },
    drawerList() {
      return this.keys.map(v => {
        return {  
          value: v,
          text: labels[v]
        };
      });
    }
  },
  methods: {
    clickHandler(item, index) {
      console.log(item, index);
    },
    showDrawer() {
      this.$refs.drawer.show();
    },
    selectHandler(selectedVal) {
      this.selectedKeys = [...selectedVal];
      this.$store.commit("saveSelectedVal", [...selectedVal]);
    },
    onAddCart(el){
      this.ball.el = el;
      this.ball.show = true;
    },
    beforeEnter(el){  // 动画初始值设置
      const dom = this.ball.el;
      const rect = dom.getBoundingClientRect();
      const x = rect.left - window.innerWidth / 2 ;
      const y = - ( window.innerHeight - rect.top ) ;
      el.style.display = '';
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    },
    enter(el, done){
      document.body.offsetHeight; // 获取offsetHeight触发重绘
      el.style.transform = "translate3d(0, 0, 0)";
      el.addEventListener("transitionend", done);
    },
    afterEnter(el){
      this.ball.show = false;
      el.style.display = "none";
    },
  }
};
</script>
<style lang="scss">
.slider {
  width: 100%;
}
.ball-wrap .ball{
  position: fixed;
  left: 50%;
  bottom: 10px;
  z-index: 200;
  width: 16px;
  height: 16px;
  background-color: red;
  border-radius: 50%;
  transition: all 0.5s cubic-bezier(0.49, -0.29, 0.75, 0.41);
}
</style>
