// 统一请求路径初始化请求
import axios from "axios";
class Request {
  constructor() {
    this._axios = axios.create({
      // baseURL: "http://httpbin.org/",
      // baseURL: "http://127.0.0.1:8888",
    });
  }
}

export default new Request();