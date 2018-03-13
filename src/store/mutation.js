/*
1)包含多个直接更新state的方法(回调函数)的对象
2)谁来触发: action中的commit('mutation名称')
3)只能包含同步的代码, 不能写异步代码
 */
import {
  RECEIVE_ADDRESS,
  RECEIVE_TYPES,
  RECEIVE_SHOPS,
  RECEIVE_USER_INFO,
  RECEIVE_INFO,
  RECEIVE_RATINGS,
  RECEIVE_GOODS,
  INCREMENT_FOOD_COUNT,
  DECREMENT_FOOD_COUNT,
  CLEARCART
} from './mutation-types'
import Vue from 'vue'

export default {
  [RECEIVE_ADDRESS](state, {address}) {
    state.address = address
  },
  [RECEIVE_TYPES](state,{foodTypes}){
    state.foodTypes = foodTypes
  },
  [RECEIVE_SHOPS](state,{shops}){
    state.shops = shops
  },
  [RECEIVE_USER_INFO](state,{userInfo}){//[RECEIVE_USER_INFO]解析为="receive_user_info"
    state.userInfo = userInfo
  },
  [RECEIVE_INFO](state, {info}) {
    state.info = info
  },

  [RECEIVE_RATINGS](state, {ratings}) {
    state.ratings = ratings
  },
  [RECEIVE_GOODS](state, {goods}) {
    state.goods = goods
  },
  [INCREMENT_FOOD_COUNT](state, {food}) {
    if(!food.count) { // 第一次增加时, 没有count
      // food.count = 1 // 添加count属性, 并指定为1
      // 问题: 新添加的属性没有数据劫持==>数据绑定==>更新了数据但界面不变
      Vue.set(food, 'count',1) // 给有数据绑定的对象添加指定属性名和值的属性(有绑定)
      state.shopCart.push(food)
    } else { // 有count
      food.count++
    }
  },
  [DECREMENT_FOOD_COUNT](state, {food}) {
    if(food.count) { // count有值才减1
      food.count--
      if(food.count===0) {// 如果数量减为0, 从购物车中移除
        state.shopCart.splice(state.shopCart.indexOf(food), 1)
      }
    }

  },
  [CLEARCART](state){
    // 将shopCart中所有food的count置为0
    state.shopCart.forEach((food)=>{
      food.count=0
    })
    state.shopCart = []
  }
}


