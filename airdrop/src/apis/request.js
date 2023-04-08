// 统一请求路径初始化请求
import axios from "axios";
class Request {
  constructor() {
    this._axios = axios.create({
      // baseURL: "http://httpbin.org/",
      baseURL: "http://192.168.1.103:8888",
      // baseURL: "http://192.168.1.102:8888"
      // baseURL: "http://172.30.32.17:8888"
    });
    this._axios.interceptors.response.use(function (res) {
      return res.data
    })
  }
}

export default new Request();