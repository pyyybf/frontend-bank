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
  let params = new URLSearchParams();
  params.append("ids", data.ids);
  return HttpRequest.request({
    url: `${api.paperPre}/del`,
    method: 'DELETE',
    params
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
  let params = new URLSearchParams();
  for (let key in data) {
    params.append(key, data[key]);
  }
  return HttpRequest.request({
    url: `${api.paperPre}/get`,
    method: 'GET',
    params
  })
}

export const publishPapersAPI = (data) => {
  let params = new URLSearchParams();
  params.append("ids", data.ids);
  return HttpRequest.request({
    url: `${api.paperPre}/publish`,
    method: 'PUT',
    params
  })
}

export const abolishPapersAPI = (data) => {
  let params = new URLSearchParams();
  params.append("ids", data.ids);
  return HttpRequest.request({
    url: `${api.paperPre}/abolish`,
    method: 'PUT',
    params
  })
}

export const getPaperByIdAPI = (id) => {
  return HttpRequest.request({
    url: `${api.paperPre}/get/${id}`,
    method: 'GET'
  })
}

export const getStatisticalDataAPI = () => {
  return HttpRequest.request({
    url: `${api.paperPre}/getStatisticalData`,
    method: 'GET'
  })
}

export const getRecentAnalyzedPapersAPI = () => {
  return HttpRequest.request({
    url: `${api.paperPre}/getRecentAnalyzed`,
    method: 'GET'
  })
}

export const getPaperIdByTitleAPI = (data) => {
  return HttpRequest.request({
    url: `${api.paperPre}/getPaperId`,
    method: 'GET',
    params: {title: data}
  })
}
