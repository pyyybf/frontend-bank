import HttpRequest from '@/axios/api.request'

const api = {
  statutePre: '/api/statute',
}

export const addAPI = (data) => {
  return HttpRequest.request({
    url: `${api.statutePre}/add`,
    method: 'POST',
    data
  })
}

export const delAPI = (data) => {
  return HttpRequest.request({
    url: `${api.statutePre}/del`,
    method: 'DELETE',
    data
  })
}

export const updateAPI = (data) => {
  return HttpRequest.request({
    url: `${api.statutePre}/update`,
    method: 'PUT',
    data
  })
}

export const getAPI = (data) => {
  return HttpRequest.request({
    url: `${api.statutePre}/get`,
    method: 'GET',
    data
  })
}
