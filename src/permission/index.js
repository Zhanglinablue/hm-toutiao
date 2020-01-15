import router from '@/router'
import store from '@/store'

// 路由守卫
router.beforeEach((to, from, next) => {
  if (to.path.startsWith('/user') && !store.state.user.token) {
    let topath = {
      path: '/login',
      query: {
        directUrl: to.path
      }
    }
    next(topath)
  } else {
    next()
  }
})

export default router
