import request from "./request"

// 获取目录
export const getInfo = () => {
  return request._axios.get("/menu")
}

export const DeleteF = (filename) => {
  return request._axios.get("/delete?file=" + filename)
}

export const getIP = () => {
  return request._axios.get('/ip')
}
