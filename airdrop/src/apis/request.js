// 统一请求路径初始化请求
import axios from 'axios'
class Request {
  constructor() {
    this._axios = axios.create({
      // baseURL: "http://192.168.1.230:8888",
      baseURL: 'http://127.0.0.1:8888'
    })
    this._axios.interceptors.response.use(function (res) {
      return res.data
    })
  }
}

export default new Request()
