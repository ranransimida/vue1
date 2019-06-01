<template>
  <div>
    <div v-for="good in goods" :key="good.id" class="item">
      <router-link :to="`/detail/${good.id}`">
        <div class="left">
          <img :src="good.img" alt="" @click.stop.prevent="imgPreview(good.img)">
        </div>
        <div class="right">
          <div class="title">{{good.title}}</div>
          <div class="info">
            <i class="cubeic-add" @click.stop.prevent="addCart($event, good)"></i>
            <span>{{good.count}}人购买</span>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: ["goods"],
  data() {
    return {};
  },
  methods: {
    imgPreview(img){
      this.$createImagePreview({
        imgs: [img]
      }).show();
    },
    addCart($event, good){
      this.$store.commit("addCart", good);
      // 父Home需要知道小球从哪个商品点的，这里用派发事件的方式传出去好让外面得到ball.el
      this.$emit("addCart", $event.target);
    }
  }
};
</script>

<style lang='scss' scoped>
.item{
  padding: 10px;
  overflow: hidden;
  .left{
    width: 100px;
    float: left;
    img{
      width: 100%;
    }
  }
  .right{
    margin-left: 120px;
    text-align: left;
    .title{
      line-height: 30px;
    }
    .cubeic-add{
      font-size: 22px;
    }
  }
}
</style>
