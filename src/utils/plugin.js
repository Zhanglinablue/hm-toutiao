import Vue from 'vue'
export default Vue.prototype.$gnotify = (params) => Vue.prototype.$notify({ duration: 800, ...params })
