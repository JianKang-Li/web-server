var express = require("express");
var router = express.Router();
var multiparty = require("multiparty");
var fs = require("fs");
const getIPAddress = require('../ip')
const findPort = require('../port')

let wss = null
let Wsport = null
findPort(8089, (port) => {
  /* 创建webSocket实例 */
  const WebSocket = require('ws')

  wss = new WebSocket.Server({ port });
  wss.on('connection', function (ws) {
    console.log('client connected');
    ws.on('message', function (data, isBinary) {
      const text = isBinary ? data : data.toString()
      // console.log(text);

    });
  });

  Wsport = port
  console.log(`ws run at ws://127.0.0.1:${port}`);
})

function wsSend(text) {
  wss.clients.forEach(cl => {
    cl.send(text)
  })
}

var ip = getIPAddress();

router.get('/ip', function (req, res, next) {
  res.send({ ip, port: Wsport })
})

router.get("/", function (req, res) {
  res.render("../airdrop/dist/index.html");
});

router.get("/menu", function (req, res, next) {
  try {
    let menu = fs.readdirSync("./public/files/");
    let menu1 = [];
    let idx = 1
    menu.forEach((item) => {
      if (item != ".gitkeep") {
        let obj = {
          filename: item,
          index: idx
        }
        menu1.push(obj);
        idx++
      }
    });
    res.send(menu1);
  } catch (e) {
    next(e)
  }
});

router.post("/upload", function (req, res, next) {
  var form = new multiparty.Form();
  form.uploadDir = "./files/";
  form.parse(req, function (err, fields, files) {
    if (err) {
      next(err)
    } else {
      for (let i = 0; i < files.file.length; i++) {
        let file = files.file[i]
        let name = file.originalFilename;
        fs.rename(file.path, "./public/files/" + name, (err) => {
          if (err) {
            // console.log("重命名失败");
            res.setHeader("Content-Type", "application/text");
            res.status(500).send({
              status: 500,
              message: "Error"
            });
            next(err)
          }
        });
      }
      // console.log("命名成功");
      res.status(200).send({
        status: 200,
        message: "Success"
      });
      wsSend('upload')
    }
  });
});

router.get("/delete", function (req, res, next) {
  arr = decodeURI(req.url).split("?");
  filename = arr[1].split("=")[1];
  try {
    fs.access("./public/files/" + filename, (err) => {
      console.log(`${filename} ${err ? "does not exist" : "exists"}`);
    });
    fs.unlinkSync("./public/files/" + filename);
    res.send("文件已删除");
    wsSend('delete')
  } catch (e) {
    // console.log(e);
    res.send("删除失败");
    next(e)
  }
});

router.post('/write', function (req, res, next) {
  let text = req.body.text.trim()
  if (text) {
    console.log(text);
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


module.exports = router;
