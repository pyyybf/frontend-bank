import HttpRequest from '@/axios/api.request'

const api = {
  paperPre: '/api/paper',
}

export const addPaperAPI = (data) => {
  return HttpRequest.request({
    url: `${api.paperPre}/add`,
    method: 'POST',
    headers: {'Content-Type': 'multipart/form-data'},
    data
  })
}

export const delPapersAPI = (data) => {
  return HttpRequest.request({
    url: `${api.paperPre}/del`,
    method: 'DELETE',
    params: data
  })
}

export const updatePaperByIdAPI = (id, data) => {
  return HttpRequest.request({
    url: `${api.paperPre}/update/${id}`,
    method: 'PUT',
    headers: {'Content-Type': 'multipart/form-data'},
    data
  })
}

export const getAPI = (data) => {
  return HttpRequest.request({
    url: `${api.paperPre}/get`,
    method: 'GET',
    params: data
  })
}

export const publishPapersAPI = (data) => {
  return HttpRequest.request({
    url: `${api.paperPre}/publish`,
    method: 'PUT',
    params: data
  })
}

export const abolishPapersAPI = (data) => {
  return HttpRequest.request({
    url: `${api.paperPre}/abolish`,
    method: 'PUT',
    params: data
  })
}

export const getPaperByIdAPI = (id) => {
  return HttpRequest.request({
    url: `${api.paperPre}/get/${id}`,
    method: 'GET'
  })
}
