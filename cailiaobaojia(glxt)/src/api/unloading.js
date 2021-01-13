import request from '@/utils/request';

export function unloadList(data)
{
  return request({
    url: '/adminApiToken/unloadList',
    method: 'post',
    data
  })
}

export function unloadUpdate(data)
{
  return request({
    url: '/adminApiToken/unloadUpdate',
    method: 'post',
    data
  })
}

export function unloadDelete(data)
{
  return request({
    url: '/adminApiToken/unloadDelete',
    method: 'post',
    data
  })
}

export function unloadAdd(data)
{
  return request({
    url: '/adminApiToken/unloadAdd',
    method: 'post',
    data
  })
}