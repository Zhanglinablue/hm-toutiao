// 获取文章的数据
import request from '@/utils/request'
/***
 * axios中query参数放置位置在params上
 * body参数位置在data上
 */
export function getArticles (params) {
  return request({
    url: 'http://ttapi.research.itcast.cn/app/v1_1/articles',
    params: { with_top: 1, ...params }
  })
}
