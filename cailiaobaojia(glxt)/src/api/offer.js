import request from '@/utils/request'

export function getOfferList(data)
{
  return request({
    url: '/adminApiToken/offerList',
    method: 'post',
    data
  })
}

export function offerAdd(data)
{
  return request({
    url: '/adminApiToken/offerAdd',
    method: 'post',
    data
  })
}

export function offerInfo(data)
{
  return request({
    url: '/adminApiToken/offerInfo',
    method: 'post',
    data
  })
}

export function offerUserAudit(data)
{
  return request({
    url: '/adminApiToken/offerUserAudit',
    method: 'post',
    data
  })
}

export function offerDelete(data)
{
  return request({
    url: '/adminApiToken/offerDelete',
    method: 'post',
    data
  })
}
