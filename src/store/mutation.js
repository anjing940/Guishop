/*
vuex的mutations模块
 */
import {
  RECEIVE_ADDRESS,
  RECEIVE_TYPES,RECEIVE_SHOPS
} from './mutation-types'

export default {
  [RECEIVE_ADDRESS](state, {address}) {
    state.address = address
  }
}


