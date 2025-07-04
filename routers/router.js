const express = require("express")
const router = express.Router()
const multiparty = require("multiparty")
const fs = require("fs")
const getIPAddress = require('../ip')
const findPort = require('../port')
const webFs = require('../utils/webFs')
const FileUtil = require('../utils/fileUtil')
const tokenTool = require('../utils/token')

// 创建缓存文件夹
fs.access('./cache', fs.constants.F_OK, (err) => {
  if (err) {
    fs.mkdirSync('./cache')
  }
})

const webfs = new webFs()
let wss = null
let wsPort = null
const ip = getIPAddress()
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

  wsPort = port
  console.log(`ws run at ws://${ip}:${port}`)
})

function wsSend(text) {
  wss.clients.forEach(cl => {
    cl.send(JSON.stringify(text))
  })
}

router.get('/ip', function (req, res, next) {
  res.send({ ip, wsPort: wsPort, port: 8888 })
})

router.get("/", function (req, res) {
  const HtmlPath = "../airdrop/dist/index.html"

  res.render(HtmlPath)
})

router.get("/menu", function (req, res, next) {
  const token = req.query.token

  if (!tokenTool.sureToken(token)) {
    res.status(200).send({
      status: 403,
      msg: 'token 错误'
    })

    return
  }
  try {
    const path = req.query.path || ''
    const size = req.query.size || 10
    const page = req.query.page || 1
    const menu = webfs.read(path, size, page)

    res.send(menu)
  } catch (e) {
    next(e)
  }
})

router.post("/upload", function (req, res, next) {
  const form = new multiparty.Form()
  form.uploadDir = "./cache"
  form.parse(req, function (err, fields, files) {
    const path = req.query.path
    const file = files.file[0]
    const name = file.originalFilename
    const fileName = fields.fileName[0]
    const total = parseInt(fields.total[0])
    const totalSize = parseInt(fields.totalSize[0])
    const token = fields.token[0]

    if (!tokenTool.sureToken(token)) {
      res.status(200).send({
        status: 403,
        msg: 'token 错误'
      })

      return
    }

    if (err) {
      next(err)
    } else {
      fs.rename(file.path, `./public/files/${path}/${name}`, (err) => {
        if (err) {
          res.setHeader("Content-Type", "application/text")
          res.status(500).send({
            status: 500,
            message: "Error",
            fileName: name
          })
          next(err)
          return
        }
      })

      res.status(200).send({
        status: 200,
        message: "Success",
        fileName: name
      })
      if (total > 1 && parseInt(name.match(/\d+$/g)) === total - 1) {
        FileUtil.mergeFiles(fileName, total, totalSize).then(res => {
          wsSend({
            status: 'upload',
          })
        }).catch(e => {
          next(e)
        })
      }
    }
  })
})

router.get('/update', function (req, res, next) {
  const token = req.query.token

  if (!tokenTool.sureToken(token)) {
    res.status(200).send({
      status: 403,
      msg: 'token 错误'
    })

    return
  }
  wsSend({
    status: 'upload',
  })
})

router.get("/delete", function (req, res, next) {
  const filename = decodeURIComponent(req.query.filename)
  const path = decodeURIComponent(req.query.path)
  const token = req.query.token

  console.log(filename)

  if (!tokenTool.sureToken(token)) {
    res.status(200).send({
      status: 403,
      msg: 'token 错误'
    })

    return
  }

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
    wsSend({
      status: 'delete',
    })
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

  const token = req.body.token

  if (!tokenTool.sureToken(token)) {
    res.status(200).send({
      status: 403,
      msg: 'token 错误'
    })

    return
  }

  if (text) {
    console.log(text)
    const msg = {
      status: 'write',
      content: text
    }
    wsSend(msg)
    res.send({
      status: 200,
      message: "wrote"
    })
  }
})

router.post('/create', function (req, res, next) {
  try {
    const type = req.body.type
    const name = req.body.name
    const path = req.body.path

    const token = req.body.token

    if (!tokenTool.sureToken(token)) {
      res.status(200).send({
        status: 403,
        msg: 'token 错误'
      })

      return
    }
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
  const token = req.query.token

  if (!tokenTool.sureToken(token)) {
    res.status(200).send({
      status: 403,
      msg: 'token 错误'
    })

    return
  }
  const msg = {
    status: 'clear'
  }
  wsSend(msg)
  res.send({
    status: 200,
    message: "cleaned"
  })
})

router.get('/token', function (req, res, next) {
  const token = req.query.token

  if (tokenTool.sureToken(token)) {
    res.status(200).send({ msg: 'token is ok' })
  } else {
    res.status(403).send({ msg: 'token is expire' })
  }
})

module.exports = router
