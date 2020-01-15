import axios from 'axios'
import JSONBIG from 'json-bigint'
import store from '@/store'
import router from '@/router'
// 创建的新实例和原axios没有关系
const instance = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/app/v1_0',
  transformResponse: [function (data) {
    return data ? JSONBIG.parse(data) : {}
  }]
})
// 拦截器
instance.interceptors.request.use(function (config) {
// 判断token是否存在
  if (store.state.user.token) {
    // 添加在请求头里
    config.headers['Authorization'] = `Bearer ${store.state.user.token}`
  }
  return config
}, function (error) {
  return Promise.reject(error)
})
// 响应拦截
instance.interceptors.response.use(function (response) {
// response会在返回数据外默认包含一层data
  try {
    return response.data.data
  } catch (error) {
    return response.data
  }
}, async function (error) {
  // 请求失败，判断token和
  if (error.response && error.response.status === 401) {
    let topath = {
      path: '/login',
      query: {
        directUrl: router.currentRouter.path
      }
    }
    // 判断refresh_token
    if (store.state.user.refresh_token) {
      try {
        let result = await axios({
          url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations',
          method: 'put',
          headers: {
            Authorization: `bearer ${store.state.user.refresh_token}`
          }
        })
        store.commit('updateUser', { user: { token: result.data.data.token, refresh_token: store.state.user.refresh_token }
        })
        return instance(error.config)
      } catch (error) {
        store.commit('delUser')
        router.push(topath)
      }
    } else {
      router.push(topath)
    }
  }
  return Promise.reject(error)
})
export default instance
