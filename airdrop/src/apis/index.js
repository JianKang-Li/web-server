import request from './request'

// 获取目录
export const getInfo = (path = '') => {
  return request._axios.get('/menu', {
    params: {
      path,
    },
  })
}

// 删除文件
export const DeleteF = (filename, path) => {
  return request._axios.get(`/delete?file=${filename}&path=${path}`)
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

// 创建文件夹
export const createDirApi = (dirName, path) => {
  return request._axios.post('/create', {
    type: 'dir',
    name: dirName,
    path
  })
}

// 获取记事本内容
export const getNote = () => {
  return request._axios.get('/note/read')
}

// 修改记事本内容
export const editNote = (context) => {
  return request._axios.post('/note/edit', {
    context
  })
}
