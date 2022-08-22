var express = require("express");
var fs = require("fs");
var bodyParser = require("body-parser");
var os = require("os");
var networkInterfaces = os.networkInterfaces();

var app = express();
app.engine("html", require("express-art-template"));
app.use("/public", express.static("public"));
app.use("/file", express.static("./public/files/"));
// app.use("/node_modules", express.static("node_modules"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// 跨域
const cors = require("cors");
app.use(cors());


var Router = require("./routers/router");
app.use("/", Router);

app.use((err, req, res, next) => {
  if (err) console.log(err);
  res.send("服务器出错了！");
  next();
});

// console.info(networkInterfaces);
var getIPAddress = function () {
  var ipv4 = "";
  var ifaces = os.networkInterfaces();
  // console.log(ifaces); //所有类型的适配器和全部内容
  for (var dev in ifaces) {
    ifaces[dev].forEach(function (details, alias) {
      if (dev === "WLAN") {
        //判断需要获取IP的适配器
        if (details.family == "IPv4") {
          //判断是IPV4还是IPV6 还可以通过alias去判断
          ipv4 = details.address; //取addressIP地址
        }
      }
      if (dev === "ens33") {
        //判断需要获取IP的适配器
        if (details.family == "IPv4") {
          //判断是IPV4还是IPV6 还可以通过alias去判断
          ipv4 = details.address; //取addressIP地址
        }
      }
      if (dev === "wlan0") {
        if (details.family == "IPv4") {
          ipv4 = details.address;
        }
      }
    });
  }
  // console.log(ipv4);
  return ipv4 || "127.0.0.1";
};
var ip = getIPAddress();
app.listen(8888, function () {
  console.log(`启动成功!
- http://127.0.0.1:8888
- http://${ip}:8888`);
});
