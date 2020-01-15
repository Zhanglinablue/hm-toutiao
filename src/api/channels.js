import request from '@/utils/request'
export function getchannels () {
  return request({
    url: '/user/channels'
  })
}
