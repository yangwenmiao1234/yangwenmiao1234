import request from '@/utils/request'

// 获取公司信息接口
export function shiyanshi(data) {
    return request({
      url: '/api/Formula/Get',
      method: 'get',
      params: data
    })
  }
  // 添加公司信息接口
  export function addshiyanshi(data) {
    return request({
      url: '/api/Formula/Post',
      method: 'post',
      data,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    })
  }
  // 修改公司信息接口
  export function modifyshiyanshi(data) {
    return request({
      url: '​/api​/Formula​/Put',
      method: 'put',
      data,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    })
  }
  // 删除公司接口
  export function deleteshiyanshi(data) {
    return request({
      url: '/api/Formula/Delete',
      method: 'delete',
      params: data
    })
  }