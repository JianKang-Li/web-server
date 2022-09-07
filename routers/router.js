var express = require("express");
var router = express.Router();
var multiparty = require("multiparty");
var fs = require("fs");

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
  } catch (e) {
    // console.log(e);
    res.send("删除失败");
    next(e)
  }
});

router.post("/write", function (req, res) {
  context = req.body;
  console.log(context)
});

module.exports = router;
