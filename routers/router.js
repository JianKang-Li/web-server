var express = require("express")
var router = express.Router()
var multiparty = require("multiparty")
var fs = require("fs")
const getIPAddress = require('../ip')
const findPort = require('../port')
const webFs = require('../utils/webFs')


const webfs = new webFs()
let wss = null
let Wsport = null
findPort(8089, (port) => {
  /* 创建webSocket实例 */
  const WebSocket = require('ws')

  wss = new WebSocket.Server({ port })
  wss.on('connection', function (ws) {
    console.log('client connected')
    ws.on('message', function (data, isBinary) {
      const text = isBinary ? data : data.toString()
      // console.log(text)
    })
  })

  Wsport = port
  console.log(`ws run at ws://127.0.0.1:${port}`)
})

function wsSend(text) {
  wss.clients.forEach(cl => {
    cl.send(text)
  })
}

var ip = getIPAddress()

router.get('/ip', function (req, res, next) {
  res.send({ ip, wsport: Wsport, port: 8888 })
})

router.get("/", function (req, res) {
  res.render("../airdrop/dist/index.html")
})

router.get("/menu", function (req, res, next) {
  try {
    const path = req.query.path || ''
    let menu = fs.readdirSync(`./public/files/${path}`, { withFileTypes: true })
    let menu1 = []
    let idx = 1
    menu.forEach((item) => {
      if (item.name != ".gitkeep") {
        let obj = {
          filename: item.name,
          index: idx,
          isDir: item.isDirectory()
        }
        menu1.push(obj)
        idx++
      }
    })
    res.send(menu1)
  } catch (e) {
    next(e)
  }
})

router.post("/upload", function (req, res, next) {
  var form = new multiparty.Form()
  form.uploadDir = "./files/"
  form.parse(req, function (err, fields, files) {
    if (err) {
      next(err)
    } else {
      const path = req.query.path
      for (let i = 0; i < files.file.length; i++) {
        let file = files.file[i]
        let name = file.originalFilename
        fs.rename(file.path, `./public/files/${path}/${name}`, (err) => {
          if (err) {
            res.setHeader("Content-Type", "application/text")
            res.status(500).send({
              status: 500,
              message: "Error"
            })
            next(err)
          }
        })
      }
      res.status(200).send({
        status: 200,
        message: "Success"
      })
      wsSend('upload')
    }
  })
})

router.get("/delete", function (req, res, next) {
  const arr = decodeURI(req.url).split("?")
  const params = arr[1].split('&')
  const filename = params[0].split("=")[1]
  const path = params[1].split('=')[1] || ''
  try {
    const filePath = `./public/files/${path}/${filename}`
    fs.access(filePath, (err) => {
      console.log(`${filename} ${err ? "does not exist" : "exists"}`)
    })
    fs.unlinkSync(filePath)
    res.send({
      status: 200,
      msg: '删除成功'
    })
    wsSend('delete')
  } catch (e) {
    // console.log(e)
    res.send({
      status: 500,
      msg: "删除失败"
    })
    next(e)
  }
})

router.post('/write', function (req, res, next) {
  let text = req.body.text.trim()
  if (text) {
    console.log(text)
    const msg = {
      status: 'write',
      content: text
    }
    const data = JSON.stringify(msg)
    wsSend(data)
    res.send({
      status: 200,
      message: "writed"
    })
  }
})

router.post('/create', function (req, res, next) {
  try {
    const type = req.body.type
    const name = req.body.name
    const path = req.body.path
    const result = webfs.create(type, name, path)
    if (result.status) {
      res.send({
        status: 200,
        msg: "created"
      })
      wsSend('upload')
    }
  } catch (e) {
    res.send({
      status: 500,
      msg: "创建文件夹失败"
    })
    next(e)
  }
})

router.get('/clear', function (req, res, next) {
  const msg = {
    status: 'clear'
  }
  const data = JSON.stringify(msg)
  wsSend(data)
  res.send({
    status: 200,
    message: "cleaned"
  })
})


module.exports = router
