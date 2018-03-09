/*
 vuex的action
 包含多个事件回调函数的对象
 通过执行: commit()来触发mutation的调用, 间接更新state
 组件中: $store.dispatch('action名称')
 */
import  {reqAddress,reqFoodTypes,reqShops} from '../api'
import {RECEIVE_ADDRESS,RECEIVE_TYPES,RECEIVE_SHOPS} from "./mutation-types";

export default {
  /**
   * 获取地址信息(根据经纬度串)
   */
  async getAddress({commit, state}) {
    const geohash = state.latitude + ',' + state.longitude
    const result = await reqAddress(geohash)
    commit(RECEIVE_ADDRESS, {address: result.data})
  },
}


