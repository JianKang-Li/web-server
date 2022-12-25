var express = require("express");
var router = express.Router();
var multiparty = require("multiparty");
var fs = require("fs");

/* 创建webSocket实例 */
const WebSocket = require('ws')

const wss = new WebSocket.Server({ port: 8089 });
wss.on('connection', function (ws) {
  console.log('client connected');
  ws.on('message', function (data, isBinary) {
    const text = isBinary ? data : data.toString()
    console.log(text);
  });
});

router.get("/", function (req, res) {
  res.render("../views/index.html");
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
      // console.log(files.filename);
      let name = files.filename[0].originalFilename;
      fs.rename(files.filename[0].path, "./public/files/" + name, (err) => {
        if (err) {
          // console.log("重命名失败");
          res.setHeader("Content-Type", "application/text");
          res.status(500).send({
            status: 500,
            message: "Error"
          });
          next(err)
        } else {
          // console.log("命名成功");
          res.status(200).send({
            status: 200,
            message: "Success"
          });
          wss.clients.forEach(cl => {
            cl.send('update')
          })
        }
      });
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
    wss.clients.forEach(cl => {
      cl.send('update')
    })
  } catch (e) {
    // console.log(e);
    res.send("删除失败");
    next(e)
  }
});

router.get('/ip', function (req, res, next) {
  res.send()
})


console.log('ws run at ws://127.0.0.1:8089');


module.exports = router;
