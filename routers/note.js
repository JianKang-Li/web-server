const express = require("express")
const router = express.Router()
const fs = require("fs")

router.get('/read', function (req, res, next) {
  try {
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
