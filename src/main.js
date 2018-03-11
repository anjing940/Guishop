import Vue from 'vue'
import router from './router'
import App from './App'
import store from './store'
import './mock/MockServer' // 后面就可以访问内部定义好的接口

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render:h => h(App),
  router,
  store
})
