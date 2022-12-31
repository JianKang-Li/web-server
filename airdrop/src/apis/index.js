import request from "./request"

// 获取目录
export const getInfo = () => {
  return request._axios.get("/menu")
}

// 删除文件
export const DeleteF = (filename) => {
  return request._axios.get("/delete?file=" + filename)
}
// 获取主机IP
export const getIP = () => {
  return request._axios.get('/ip')
}
// 上传文本
export const postT = (data) => {
  return request._axios.post('/write', data)
}

// 清除文本
export const cleanT = () => {
  return request._axios.get('/clear')
}
