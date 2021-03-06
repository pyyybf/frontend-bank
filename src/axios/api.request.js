import axios from "axios"

const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : 'http://106.15.42.179:8080'

const HttpRequest = axios.create({
  baseURL: baseUrl,  // api的base_url
  timeout: 30000,  // 请求超时时间
  withCredentials: true
});

export default HttpRequest;
