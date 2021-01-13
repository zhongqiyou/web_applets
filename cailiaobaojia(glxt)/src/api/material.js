import request from '@/utils/request'

export function materialList(data)
{
  return request({
    url: '/adminApiToken/materialList',
    method: 'post',
    data
  })
}

export function getMaterialInfo(data)
{
  return request({
    url: '/adminApiToken/updateMaterial',
    method: 'post',
    data
  })
}

export function getConcreteList(data)
{
  return request({
    url: '/adminApiToken/concreteList',
    method: 'post',
    data
  })
}

export function concreteUpdate(data)
{
  return request({
    url: '/adminApiToken/concreteUpdate',
    method: 'post',
    data
  })
}

export function concreteAdd(data)
{
  return request({
    url: '/adminApiToken/concreteAdd',
    method: 'post',
    data
  })
}

export function concreteDelete(data)
{
  return request({
    url: '/adminApiToken/concreteDelete',
    method: 'post',
    data
  })
}

export function uninstallList(data)
{
  return request({
    url: '/adminApiToken/uninstallList',
    method: 'post',
    data
  })
}

export function uninstallUpdate(data)
{
  return request({
    url: '/adminApiToken/uninstallUpdate',
    method: 'post',
    data
  })
}

export function uninstallDelete(data)
{
  return request({
    url: '/adminApiToken/uninstallDelete',
    method: 'post',
    data
  })
}

export function uninstallAdd(data)
{
  return request({
    url: '/adminApiToken/uninstallAdd',
    method: 'post',
    data
  })
}

export function subscribeMessage(data)
{
  return request({
    url: '/adminApiToken/subscribeMessage',
    method: 'post',
    data
  })
}

export function uninstallAndConcrete(data)
{
  return request({
    url: '/adminApiToken/uninstallAndConcrete',
    method: 'post',
    data
  })
}



// 删除报料
export function deleteMaterial(data)
{
  return request({
    url: '/adminApiToken/deleteMaterial',
    method: 'post',
    data
  })
}

// 手机信息通知
export function sendmes(data)
{
  return request({
    url: '/adminApiToken/sendmes',
    method: 'post',
    data
  })
}


