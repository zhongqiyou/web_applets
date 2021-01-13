import request from '@/utils/request'

/**
 * 获取后台用户
 * @param data
 */
export function adminList(data)
{
  return request({
    url: '/userApiToken/adminList',
    method: 'post',
    data
  })
}

/**
 * 审核中用户列表
 * @param data
 */
export function auditList(data)
{
  return request({
    url: '/userApiToken/userAuditList',
    method: 'post',
    data
  })
}

/**
 * 未通过用户列表
 * @param data
 */
export function failedList(data)
{
  return request({
    url: '/userApiToken/userFailedList',
    method: 'post',
    data
  })
}

/**
 * 审核通过用户
 * @param data
 */
export function adoptList(data)
{
  return request({
    url: '/userApiToken/userAdoptList',
    method: 'post',
    data
  })
}

export function userInfo(data)
{
  return request({
    url: '/adminApiToken/userInfo',
    method: 'post',
    data
  })
}

export function updateUserAudit(data)
{
  return request({
    url: '/adminApiToken/updateUserAudit',
    method: 'post',
    data
  })
}

export function getSupplierList(data)
{
  return request({
    url: '/userApiToken/getUserSupplierList',
    method: 'post',
    data
  })
}

export function getUserAdminList(data)
{
  return request({
    url: '/userApiToken/getUserAdminList',
    method: 'post',
    data
  })
}

export function deletedUser(data)
{
  return request({
    url: '/userApiToken/deleteUser',
    method: 'post',
    data
  })
}

export function adminUserUpdate(data)
{
  return request({
    url: '/userApiToken/adminUserUpdate',
    method: 'post',
    data
  })
}

export function adminUserAdd(data)
{
  return request({
    url: '/userApiToken/adminUserAdd',
    method: 'post',
    data
  })
}

export function adminUserDeleted(data)
{
  return request({
    url: '/userApiToken/adminUserDeleted',
    method: 'post',
    data
  })
}
