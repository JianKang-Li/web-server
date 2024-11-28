const os = require("os")

const getIPAddress = function () {
  var ipv4 = ""
  var ifaces = os.networkInterfaces()
  // console.log(ifaces) //所有类型的适配器和全部内容
  for (var dev in ifaces) {
    ifaces[dev].forEach(function (details, alias) {
      if (dev === "WLAN") {
        //判断需要获取IP的适配器
        if (details.family == "IPv4") {
          //判断是IPV4还是IPV6 还可以通过alias去判断
          ipv4 = details.address //取addressIP地址
        }
      }
      else if (dev === "ens33") {
        //判断需要获取IP的适配器
        if (details.family == "IPv4") {
          //判断是IPV4还是IPV6 还可以通过alias去判断
          ipv4 = details.address //取addressIP地址
        }
      }
      else if (dev === "wlan0") {
        if (details.family == "IPv4") {
          ipv4 = details.address
        }
      } else if (dev === 'enp4s0') {
        if (details.family == "IPv4") {
          ipv4 = details.address
        }
      }
    })
  }
  // console.log(ipv4)
  return ipv4 || "127.0.0.1"
}

module.exports = getIPAddress