import Vue from 'vue'
import router from './router'
import App from './App'
import store from './store'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render:h => h(App),
  router,
  store
})
