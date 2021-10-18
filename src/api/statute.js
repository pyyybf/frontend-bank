import HttpRequest from '@/axios/api.request'

const api = {
  statutePre: '/api/statute',
}

export const addStatuteAPI = (data) => {
  return HttpRequest.request({
    url: `${api.statutePre}/add`,
    method: 'POST',
    data
  })
}

export const delStatutesAPI = (data) => {
  return HttpRequest.request({
    url: `${api.statutePre}/del`,
    method: 'DELETE',
    data
  })
}

export const updateStatuteByIdAPI = (data) => {
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

export const publishStatutesAPI = (data) => {
  return HttpRequest.request({
    url: `${api.statutePre}/publish`,
    method: 'PUT',
    data
  })
}

export const abolishStatutesAPI = (data) => {
  return HttpRequest.request({
    url: `${api.statutePre}/abolish`,
    method: 'PUT',
    data
  })
}

export const getStatuteByIdAPI = (data) => {
  return HttpRequest.request({
    url: `${api.statutePre}/getStatuteById`,
    method: 'GET',
    data
  })
}
