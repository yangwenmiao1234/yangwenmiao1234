import request from '@/utils/request'

// 登录接口
export function login(data) {
  return request({
    url: '/api/Login/GetTokenNuxt',
    method: 'get',
    params: data
  })
}
// 登录缓存接口
export function getInfo(data) {
  return request({
    url: '/api/Login/GetTokenNuxt',
    method: 'get',
    params: data
  })
}
// 登出接口
export function logout(data) {
  return request({
    url: '/api/Login/GetTokenNuxt',
    method: 'get',
    params: data
  })
}
// 获取公司信息接口
export function gonsixin(data) {
  return request({
    url: '/api/Company/Get',
    method: 'get',
    params: data
  })
}
// 添加公司信息接口
export function addgonsixinxi(data) {
  return request({
    url: '/api/Company/Post',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
// 修改公司信息接口
export function modifygonsixin(data) {
  return request({
    url: '/api/Company/Put',
    method: 'put',
    data,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
// 删除公司接口
export function deletegonsixinxi(data) {
  return request({
    url: '/api/Company/Delete',
    method: 'delete',
    params: data
  })
}

// 胡获取砼生产线生产线接口
export function queryshenchanxianxinxi(data) {
  return request({
    url: '/api/ProduceLine/Get',
    method: 'get',
    params: data
  })
}

// 添加砼生产线接口
export function addshenchanxianxinxi(data) {
  return request({
    url: '/api/ProduceLine/Post',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

// 修改砼生产线接口
export function modifyscxxx(data) {
  return request({
    url: '/api/ProduceLine/Put',
    method: 'put',
    data,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

// 删除砼生产线接口
export function deletescxxx(data) {
  return request({
    url: '/api/ProduceLine/Delete',
    method: 'delete',
    params: data
  })
}
// 查询生产线信息接口
export function queryscxxx(data) {
  return request({
    url: '/api/ProduceLine/GetSingleByID',
    method: 'get',
    params: data
  })
}
// 获取料仓信息接口
export function querylistlcxx(data) {
  return request({
    url: '/api/Store/Get',
    method: 'get',
    params: data
  })
}
// 料仓信息添加接口
export function addlcxx(data) {
  return request({
    url: '/api/Store/Post',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
// 料仓信息删除接口
export function deleteslcxx(data) {
  return request({
    url: '/api/Store/Delete',
    method: 'delete',
    params: data
  })
}
// 修改料仓信息接口
export function modifylcxx(data) {
  return request({
    url: '/api/Store/Put',
    method: 'put',
    data,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
// 获取销售单管理信息接口
export function querylistxsdgl(data) {
  return request({
    url: '/api/SellBill/Get',
    method: 'get',
    params: data
  })
}
// 销售单管理信息添加接口
export function addxsdgl(data) {
  return request({
    url: '/api/SellBill/Post',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
// 销售单管理信息删除接口
export function deletesxsdgl(data) {
  return request({
    url: '/api/SellBill/Delete',
    method: 'delete',
    params: data
  })
}
// 修改销售单管理信息接口
export function modifyxsdgl(data) {
  return request({
    url: '/api/SellBill/Put',
    method: 'put',
    data,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
//更新销售单审核状态
export function upxsd(data) {
  return request({
    url: '/api/SellBill/UpdateStateFlag',
    method: 'put',
    params:data,
  })
}
// 获取搅运车信息接口
export function querylistjyc(data) {
  return request({
    url: '/api/Car/Get',
    method: 'get',
    params: data
  })
}
// 搅运车信息添加接口
export function addjyc(data) {
  return request({
    url: '/api/Car/Post',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
// 搅运车信息删除接口
export function deletesjyc(data) {
  return request({
    url: '/api/Car/Delete',
    method: 'delete',
    params: data
  })
}
// 修改搅运车信息接口
export function modifyjyc(data) {
  return request({
    url: '/api/Car/Put',
    method: 'put',
    data,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}


// 获取任务单信息接口
export function querylistrwd(data) {
  return request({
    url: '/api/TaskBill/Get',
    method: 'get',
    params: data
  })
}
// 任务单添加接口
export function addrwd(data) {
  return request({
    url:'/api/TaskBill/Post',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
// 任务单删除接口
export function deletesrwd(data) {
  return request({
    url: '/api/TaskBill/Delete',
    method: 'delete',
    params: data
  })
}
// 修改搅运车信息接口
export function modifyrwd(data) {
  return request({
    url: '/api/TaskBill/Put',
    method: 'put',
    data,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
// 获取原料信息接口
export function querylistylxx(data) {
  return request({
    url: '/api/Material/Get',
    method: 'get',
    params: data
  })
}
// 原料信息添加接口
export function addylxx(data) {
  return request({
    url:'/api/Material/Post',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
// 原料信息删除接口
export function deletesylxx(data) {
  return request({
    url: '/api/Material/Delete',
    method: 'delete',
    params: data
  })
}
// 修改原料信息接口
export function modifyylxx(data) {
  return request({
    url: '/api/Material/Put',
    method: 'put',
    data,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
// 获取供应商信息接口
export function querylistgysxx(data) {
  return request({
    url: '/api/Provider/Get',
    method: 'get',
    params: data
  })
}
// 供应商信息添加接口
export function addgysxx(data) {
  return request({
    url:'/api/Provider/Post',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
// 供应商信息删除接口
export function deletesgysxx(data) {
  return request({
    url: '/api/Provider/Delete',
    method: 'delete',
    params: data
  })
}
// 修改供应商信息接口
export function modifygysxx(data) {
  return request({
    url: '/api/Provider/Put',
    method: 'put',
    data,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
// 获取盘库管理接口
export function querylistpkgl(data) {
  return request({
    url: '/api/StoreInit/Get',
    method: 'get',
    params: data
  })
}
// 盘库管理添加接口
export function addpkgl(data) {
  return request({
    url:'/api/StoreInit/Post',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
// 盘库管理删除接口
export function deletespkgl(data) {
  return request({
    url: '/api/StoreInit/Delete',
    method: 'delete',
    params: data
  })
}
// 修改盘库管理信息接口
export function modifypkgl(data) {
  return request({
    url: '/api/StoreInit/Put',
    method: 'put',
    data,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
// 获取发货单接口
export function querylistfhd(data) {
  return request({
    url: '/api/TransportBill/Get',
    method: 'get',
    params: data
  })
}
// 发货单添加接口
export function addfhd(data) {
  return request({
    url: '/api/TransportBill/Post',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
// 发货单删除接口
export function deletesfhd(data) {
  return request({
    url: '/api/TransportBill/Delete',
    method: 'delete',
    params: data
  })
}
// 修改发货单接口
export function modifyfhd(data) {
  return request({
    url: '/api/TransportBill/Put',
    method: 'put',
    data,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
// // 后端接口

// export function login(data) {
//   return request({
//     url: '/vue-admin-template/user/login',
//     method: 'post',
//     data
//   })
// }

// export function getInfo(token) {
//   return request({
//     url: '/vue-admin-template/user/info',
//     method: 'get',
//     params: { token }
//   })
// }

// export function logout() {
//   return request({
//     url: '/vue-admin-template/user/logout',
//     method: 'post'
//   })
// }
