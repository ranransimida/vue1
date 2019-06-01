<template>
  <div class="cart">
    <my-header title="思密达的项目"></my-header>
    <div class="good" v-for="(item, index) in cart" :key="item.id">
      {{item.title}}:
      {{item.price}}
      <div class="right">
        <i class="cubeic-remove" @click="countMinus(index)"></i>
        <span>{{item.cartCount}}</span>
        <i class="cubeic-add" @click="countAdd(index)"></i>
      </div>
    </div>
    <div>总价：{{priceTotal}}</div>

    <cube-button :disabled="true" v-if="priceTotal < minTotal">
      还差{{minTotal - priceTotal}}可以购买
    </cube-button>
    <cube-button v-else>
      下单
      <span v-if="!token">（需要登录）</span>
    </cube-button>
  </div>
</template>
<script>
import {mapState, mapGetters} from 'vuex'
export default {
  data(){
    return {
      minTotal: 1000
    }
  },
  computed: {
    ...mapState({
      cart: state => state.cart,
      token: state => state.token
    }),
    ...mapGetters({
      priceTotal: 'priceTotal'
    })
  },
  methods:{
    countMinus(index){
      this.$store.commit("countMinus", index)
    },
    countAdd(index){
      this.$store.commit("countAdd", index)
    }
  }
}
</script>