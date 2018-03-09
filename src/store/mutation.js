/*
1)包含多个直接更新state的方法(回调函数)的对象
2)谁来触发: action中的commit('mutation名称')
3)只能包含同步的代码, 不能写异步代码
 */
import {
  RECEIVE_ADDRESS,
  RECEIVE_TYPES,RECEIVE_SHOPS
} from './mutation-types'

export default {
  [RECEIVE_ADDRESS](state, {address}) {
    state.address = address
  },
  [RECEIVE_TYPES](state,{foodTypes}){
    state.foodTypes = foodTypes
  },
  [RECEIVE_SHOPS](state,{shops}){
    state.shops = shops
  }
}


