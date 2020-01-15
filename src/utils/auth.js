const USER_TOKEN = 'heima-toutiao'
export function setUser (user) {
  // 设置用户信息
  localStorage.setItem(USER_TOKEN, JSON.stringify(user))
}
// 读取用户信息
export function getUser () {
  return JSON.parse(localStorage.getItem(USER_TOKEN) || '{}')
}
// 删除用户信息
export function delUser () {
  localStorage.removeItem(USER_TOKEN)
}
