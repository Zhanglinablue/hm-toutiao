// import Vue from 'vue'
export default {
  install (Vue) {
    Vue.prototype.$gnotify = (params) => Vue.prototype.$notify({ duration: 800, ...params })
    Vue.prototype.$sleep = sleep
  }
}
// 此处的time如果传入time的参数会用time传入的参数，如果不传参数，就使用500
function sleep (time = 500) {
  return new Promise(function (resolve) {
    setTimeout(() => resolve(), time)
  })
}
// export default {
//   // Vue.use(obj) => 会调用obj 中的install方法
//   install (Vue) {
//     //   插件
//     Vue.prototype.$gnotify = (params) => Vue.prototype.$notify({ duration: 800, ...params }) // 小伎俩
//     // Vue.prototype.$sleep = sleep // 封装一个休眠函数
//     // Vue.filter('relTime', relTime) // 注册一个全局相对时间的过滤器
//   }
// }
// // function(time = 500) 如果传time用传的 如果不传 用500
// // function sleep (time = 500) {
// //   return new Promise(function (resolve) {
// //     setTimeout(() => resolve(), time) // 表示 等待time时间之后 才能resolve
// //   })
// // }
