const express = require("express")
const router = express.Router()
const fs = require("fs")
const tokenTool = require('../utils/token')

router.get('/read', function (req, res, next) {
  try {
    const arr = decodeURI(req.url).split("?")
    const params = arr[1].split('&')
    const token = params[0].split("=")[1]

    if (!tokenTool.sureToken(token)) {
      res.status(200).send({
        status: 403,
        msg: 'token 错误'
      })

      return
    }

    const context = fs.readFileSync(`./files/note.txt`, 'utf-8')

    res.send({
      status: 200,
      context
    })
  } catch (e) {
    next(e)

    res.send({
      status: 500,
      msg: '读取备忘录文件错误'
    })
  }
})

router.post('/edit', function (req, res, next) {
  try {
    const arr = decodeURI(req.url).split("?")
    const params = arr[1].split('&')
    const token = params[0].split("=")[1]

    if (!tokenTool.sureToken(token)) {
      res.status(200).send({
        status: 403,
        msg: 'token 错误'
      })

      return
    }
    fs.writeFileSync(`./files/note.txt`, req.body.context)

    res.send({
      status: 200,
      msg: true
    })
  } catch (e) {
    next(e)

    res.send({
      status: 500,
      msg: '修改备忘录文件错误'
    })
  }
})

module.exports = router
