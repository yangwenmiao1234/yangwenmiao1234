import request from '@/utils/request'

// 根据条件获取混凝土强度
export function shiyanshicdt(data) {
  return request({
    url: '/api/Formula/GetPowerGradeData',
    method: 'get',
    params: data
  })
}

// 获取标准配方
export function shiyanshi(data) {
  return request({
    url: '/api/Formula/GetHeaderMESFormulaData',
    method: 'get',
    params: data
  })
}
// 获取标准配方数据
export function shiyanshidata(data) {
  return request({
    url: '/api/Formula/GetMESFormulaData',
    method: 'get',
    params: data
  })
}
// 添加mes配方信息接口
export function addshiyanshi(data) {
  return request({
    url: '/api/Formula/SaveFormulaMain',
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
// 获取MES标准配方下第一列的数据数据
export function querypeifang(data) {
  return request({
    url: '/api/Formula/getDownFirstRowColumn',
    method: 'get',
    params: data
  })
}
// 添加mes配方设置接口
export function addSave(data) {
  return request({
    url: '/api/Formula/SaveFormulaSetting',
    method: 'post',
    params: data
  })
}
// 添加mes配方设置接口
export function addSave2(data) {
  return request({
    url: '/api/Formula/SaveFormulaData',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
// 获取配方配置信息数据
export function querypeizhi(data) {
  return request({
    url: '/api/Formula/GetFormulaSetting',
    method: 'get',
    params: data
  })
}
