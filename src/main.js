import Vue from 'vue'
import router from './router'
import App from './App'
import store from './store'
import './mock/MockServer' // 后面就可以访问内部定义好的接口
import Split from './components/Split/Split.vue'
import VueLazyload from 'vue-lazyload' //图片的懒加载
import loading from './common/images/loading.gif'
import {Button} from 'mint-ui'


Vue.component(Button.name, Button)// mt-button

Vue.use(VueLazyload,{
  loading,
})

// 注册全局组件标签
Vue.component('Split',Split)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render:h => h(App),
  router,
  store
})
