import Vue from 'vue'
import App from './views/App.vue'

import './plugin'
import 'normalize.css'
import '@/styles/index.less'
new Vue({
  render: h => h(App)
}).$mount('#app')
