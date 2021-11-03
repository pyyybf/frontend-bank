import HttpRequest from '@/axios/api.request'

const api = {
  appendixPre: '/api/appendix',
}

export const getAppendixListAPI = (data) => {
  return HttpRequest.request({
    url: `${api.appendixPre}/getAppendixList/${data}`,
    method: 'GET'
  })
}

export const uploadAppendixAPI = (paperId, data) => {
  return HttpRequest.request({
    url: `${api.appendixPre}/uploadAppendix/${paperId}`,
    method: 'POST',
    headers: {'Content-Type': 'multipart/form-data'},
    data
  })
}

export const deleteAppendixAPI = (data) => {
  return HttpRequest.request({
    url: `${api.appendixPre}/deleteAppendix/${data}`,
    method: 'DELETE'
  })
}

export const downloadAppendixAPI = (data) => {
  return HttpRequest.request({
    url: `${api.appendixPre}/downloadAppendix/${data}`,
    method: 'POST',
    responseType: 'blob'
  })
}
