import { useDataStore } from './store'
import { getIP } from './apis'
import { ElNotification } from 'element-plus'

async function initWs() {
  const store = useDataStore()

  await getIP().then(res => {
    const ip = res.ip
    const port = res.port
    const wsPort = res.wsPort
    let ws = new WebSocket(`ws://${ip}:${wsPort}`)
    ws.onopen = () => {
      console.log('ws open')
    }
    ws.onclose = () => {
      ElNotification({
        title: 'Error',
        message: 'WebSocket 连接已断开',
        type: 'error',
      })
    }
    store.wsObj.ws = ws
    store.wsObj.ip = ip
    store.wsObj.port = port
    store.wsObj.wsPort = wsPort
  }).catch(e => {
    console.log(e, 'ws 连接失败')
  })
}

export default initWs
