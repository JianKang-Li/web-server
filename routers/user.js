const express = require("express")
const router = express.Router()
const fs = require("fs")

router.post('/login', function (req, res, next) {
  try {
    const name = req.body.name
    const password = req.body.password

    const context = JSON.parse(fs.readFileSync(`./files/user.json`, 'utf-8'))

    if (context[name] === password) {
      res.send({
        status: 200,
        msg: '登录成功',
        user: {
          name,
        }
      })
    }
  } catch (e) {
    next(e)

    res.send({
      status: 403,
      msg: '账号密码错误'
    })
  }
})

module.exports = router
