import request from './request'

// 获取目录
export const getInfo = (path = '', size = 10, page=1, token) => {
  return request._axios.get('/api/menu', {
    params: {
      path,
      size,
      page,
      token
    },
  })
}

export const notifyUpdate = (token) => {
  return request._axios.get(`/api/update?token=${token}`)
}

// 删除文件
export const DeleteF = (filename, path, token) => {
  return request._axios.get(`/api/delete?filename=${filename}&path=${path}&token=${token}`)
}
// 获取主机IP
export const getIP = () => {
  return request._axios.get('/api/ip')
}
// 上传文本
export const postT = (data) => {
  return request._axios.post('/api/write', data)
}

// 清除文本
export const cleanT = (token) => {
  return request._axios.get(`/api/clear?token=${token}`)
}

// 创建文件夹
export const createDirApi = (dirName, path, token) => {
  return request._axios.post('/api/create', {
    type: 'dir',
    name: dirName,
    path,
    token
  })
}

// 获取记事本内容
export const getNote = (token) => {
  return request._axios.get(`/api/note/read?token=${token}`)
}

// 修改记事本内容
export const editNote = (context) => {
  return request._axios.post('/api/note/edit', {
    context
  })
}

// 登录
export const sysLogin = (username, password) => {
  return request._axios.post('/api/user/login', {
    name: username,
    password
  })
}
