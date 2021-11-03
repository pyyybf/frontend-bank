import HttpRequest from '@/axios/api.request'

const api = {
  analysePre: '/api/analyse',
}

export const getAnalyseByIdAPI = (id) => {
  return HttpRequest.request({
    url: `${api.analysePre}/get/${id}`,
    method: 'GET'
  })
}

export const addAnalyseAPI = (data) => {
  return HttpRequest.request({
    url: `${api.analysePre}/add`,
    method: 'POST',
    headers: {'Content-Type': 'multipart/form-data'},
    data
  })
}

export const updateAnalyseByIdAPI = (id, data) => {
  return HttpRequest.request({
    url: `${api.analysePre}/update/${id}`,
    method: 'PUT',
    headers: {'Content-Type': 'multipart/form-data'},
    data
  })
}
