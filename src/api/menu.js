import request from '@/utils/request'

// 获取公司信息接口
export function querymenu(data) {
    return request({
        url: '/api/Permission/GetPermissionTree',
        method: 'get',
        params: data
    })
}
// 添加公司信息接口
export function addmenu(data) {
    return request({
        url: '/api/Permission/Post',
        method: 'post',
        data,
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    })
}
// 修改公司信息接口
export function modifymenu(data) {
    return request({
        url: '/api/Permission/Put',
        method: 'put',
        data,
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    })
}
// 删除公司接口
export function deletemenu(data) {
    return request({
        url: '/api/Permission/Delete',
        method: 'delete',
        params: data
    })
}