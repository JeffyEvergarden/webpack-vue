import Vue from 'vue'
import App from './App.vue'
import './css/index.less'

new Vue({
  el: '#app',
  render: (h) => h(App),
})

let promise = new Promise((resolve) => {
  resolve(110)
})

console.log('webpack 4版本整合测试')
