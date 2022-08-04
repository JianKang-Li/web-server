var express = require("express");
var router = express.Router();
var multiparty = require("multiparty");
var fs = require("fs");

router.get("/", function (req, res) {
  res.render("index.html");
});

router.get("/menu", function (req, res) {
  res.set("Access-Control-Allow-Origin", "*");
  let menu = fs.readdirSync("./public/files/");
  // console.log(menu);
  let menu1 = [];
  menu.forEach((item, idx) => {
    if (item != ".gitkeep") {
      let obj = {
        filename: item,
        index: idx
      }
      menu1.push(obj);
    }
  });
  res.send(menu1);
});
router.post("/upload", function (req, res) {
  var form = new multiparty.Form();
  form.uploadDir = "./files/";
  form.parse(req, function (err, fields, files) {
    if (err) {
      console.log(err);
    } else {
      // console.log(files.file);
      let name = files.file[0].originalFilename;
      fs.rename(files.file[0].path, "./public/files/" + name, (err) => {
        if (err) {
          // console.log("重命名失败");
          res.setHeader("Content-Type", "application/text");
          res.send("上传失败");
        } else {
          // console.log("命名成功");
          res.setHeader("Content-Type", "application/text");
          res.send("上传成功");
        }
      });
    }
  });
});

router.get("/delete", function (req, res) {
  arr = decodeURI(req.url).split("?");
  filename = arr[1].split("=")[1];
  fs.access("./public/files/" + filename, (err) => {
    console.log(`${filename} ${err ? "does not exist" : "exists"}`);
  });
  try {
    fs.unlinkSync("./public/files/" + filename);
    res.send("文件已删除");
  } catch (e) {
    console.log(e);
    res.send("删除失败");
  }
});

router.post("/write", function (req, res) {
  context = req.body;
  console.log(context)
});

module.exports = router;
