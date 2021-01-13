import request from '../utils/request'

export function getLogin(data)
{
  return request({
    url: '/adminApi/login',
    method: 'post',
    data
  })
}

export function getMenuList(data)
{
  return request({
    url: '/menuApiToken/menuList',
    method: 'post',
    data
  })
}
