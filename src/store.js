import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || '',
    selectedVal: '',
    cart: JSON.parse(localStorage.getItem('cart')) || []
  },
  mutations: {
    setToken(state, token){
      state.token = token
    },
    saveSelectedVal(state, selectedVal){
      state.selectedVal = selectedVal;
    },
    addCart(state, good){
      const item = state.cart.find(v => v.id == good.id);
      if(item) {
        item.cartCount += 1;
      } else {
        state.cart.push({
          ...good,
          cartCount: 1
        })
      }
    },
    countMinus(state, index){
      if(state.cart[index].cartCount > 1) {
        state.cart[index].cartCount -= 1;
      } else {
        state.cart.splice(index, 1)
      }
    },
    countAdd(state, index){
      state.cart[index].cartCount += 1;
    }
  },
  actions: {

  },
  getters: {
    isLogin: state => {
      return !!state.token;   // 转换为布尔值，如果是空字符串 则是false 
    },
    cartTotal: state => {
      let num = 0;
      state.cart.forEach(v => {
        num += v.cartCount
      })
      return num;
    },
    priceTotal: state => {
      return state.cart.reduce((num, i) => num += i.cartCount * i.price, 0)
    }
  }
})

store.subscribe( (mutation, state) => {
  switch (mutation.type) {
    case "setToken":
      localStorage.setItem('token', JSON.stringify(state.token));
      break;
    case "addCart":
      localStorage.setItem('cart', JSON.stringify(state.cart));
      break;
  }
})

export default store;
