import Vue from 'vue'
import App from './App.vue'
import router from './permission'
import store from './store'
import 'amfe-flexible'
import Vant from 'vant'
import 'vant/lib/index.less'
import '@/styles/index.less'
import plugin from '@/utils/plugin'

Vue.use(Vant)
Vue.use(plugin)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
