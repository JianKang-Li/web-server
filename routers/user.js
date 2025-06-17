const express = require("express")
const router = express.Router()
const fs = require("fs")
const adminName = 'admin'
const token = require('../utils/token')

router.post('/login', function (req, res, next) {
  try {
    const name = req.body.name
    const password = btoa(req.body.password).replaceAll('+','')

    const context = JSON.parse(fs.readFileSync(`./files/user.json`, 'utf-8'))

    if (context[name] === password) {
      const userToken = token.getToken(name, password)
      res.send({
        status: 200,
        msg: '登录成功',
        user: {
          name,
          token: userToken,
        }
      })
    } else {
      res.send({
        status: 403,
        msg: '账号密码错误'
      })
    }
  } catch (e) {
    next(e)

    res.send({
      status: 500,
      msg: '服务器出错了！'
    })
  }
})

module.exports = router
