import request from '@/utils/request'

// 料仓信息查询树形结构接口
export function querylisttree(data) {
    return request({
      url: '/api/Material/GetTypeMaterialTree',
      method: 'get',
      params: data
    })
  }
  // 料仓信添加一级树形结构接口
  export function addtree1(data) {
    return request({
      url: '/api/Material/PostTypeMaterial',
      method: 'post',
      data,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    })
  }
  // 料仓信息添加子类型树形结构接口
  export function addtree2(data) {
    return request({
      url: '/api/Material/PostTypeMaterialItem',
      method: 'post',
      data,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    })
  }
  // 料仓信息修改一级树形结构接口
  export function modifytree1(data) {
    return request({
      url: '/api/Material/PutTypeMaterial',
      method: 'put',
      data,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    })
  }
  // 料仓信息修改子类型树形结构接口
  export function modifytree2(data) {
    return request({
      url: '/api/Material/PutTypeMaterialItem',
      method: 'put',
      data,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    })
  }
  // 料仓信息删除一级树形结构接口
  export function deletetree1(data) {
    return request({
      url: '/api/Material/DeleteTypeMaterial',
      method: 'delete',
      params: data
    })
  }
  // 料仓信息删除子类型树形结构接口
  export function deletetree2(data) {
    return request({
      url: '/api/Material/DeleteTypeMaterialItem',
      method: 'delete',
      params: data
    })
  }