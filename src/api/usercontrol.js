import request from '@/utils/request'

// 获取用户信息接口
export function queryuser(data) {
  return request({
    url: '/api/User/Get',
    method: 'get',
    params: data
  })
}
// 添加用户信息接口
export function adduser(data) {
  return request({
    url: '/api/User/SaveUserPermission',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
// 修改用户信息接口  还未修改接口地址
export function modifyuser(data) {
  return request({
    url: '/api/Permission/Put',
    method: 'put',
    data,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
// 删除用户接口
export function deleteuser(data) {
  return request({
    url: '/api/User/Delete',
    method: 'delete',
    params: data
  })
}
