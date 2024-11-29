var express = require("express")
var bodyParser = require("body-parser")
const fs = require("fs")

const findPort = require('./port.js')
const getIPAddress = require('./ip.js')
findPort(8888, (port) => {
  var app = express()
  app.use("/public", express.static("./public"))
  app.use("/file", express.static("./public/files/"))
  app.use("/note", express.static('./files/'))
  app.use(express.static('./airdrop/dist/'))
  // app.use("/node_modules", express.static("node_modules"))
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))

  // 跨域
  const cors = require("cors")
  app.use(cors())

  const noteRouter = require('./routers/note')
  app.use("/note", noteRouter)

  const userRouter = require('./routers/user')
  app.use('/user', userRouter)

  const Router = require("./routers/router")
  app.use("/", Router)

  app.use((err, req, res, next) => {
    if (err) {
      console.log(err)
      fs.appendFileSync('./log.txt', err + "\n")
    }
    res.send("服务器出错了！")
    next()
  })

  const ip = getIPAddress()

  app.listen(port, function () {
    console.log(`启动成功!
  - http://127.0.0.1:${port}
  - http://${ip}:${port}`)
  })

})


