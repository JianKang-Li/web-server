const dir = '../public/files/'
const fs = require('fs')
const path = require('path')
const currentFilePath = path.resolve(__filename)

function mergeFile(fileList, fileWriteStream) {
  if (!fileList.length) {
    // 最后关闭可写流，防止内存泄漏
    // 关闭流之前立即写入最后一个额外的数据块(Stream 合并完成)。
    fileWriteStream.end()
    fileWriteStream.close()
    console.log('---写入完成---')
    return
  }
  const chunkFilePath = fileList.shift()
  // 获取当前的可读流
  const currentReadStream = fs.createReadStream(chunkFilePath)
  // 监听currentReadStream的on('data'),将读取到的内容调用fileWriteStream.write方法
  // end:true 读取结束时终止写入流,设置 end 为 false 写入的目标流(fileWriteStream)将会一直处于打开状态，不自动关闭
  currentReadStream.pipe(fileWriteStream, { end: false })
  // 监听可读流的 end 事件，结束之后递归合并下一个文件 或者 手动调用可写流的 end 事件
  currentReadStream.on('end', () => {
    mergeFile(fileList, fileWriteStream)
    fs.access(chunkFilePath, fs.constants.F_OK,(err)=> {
      fs.unlinkSync(chunkFilePath)
    })
  })

  // 监听错误事件，关闭可写流，防止内存泄漏
  currentReadStream.on('error', (error) => {
    fileWriteStream.close()
  })
}

function mergeFiles(name, total, totalSize) {
  const fileList = []
  let flag = true

  for (let i = 0; i < total; i++) {
    const fileName = path.join(path.dirname(currentFilePath), dir, `${name}-chunk-${i}`)
    fileList.push(fileName)

    fs.access(fileName, fs.constants.F_OK, (err) => {
      if (err) {
        flag = false
      }
    })
  }

  if (flag) {
    const filePath = path.join(path.dirname(currentFilePath), dir, name)
    const copyFileList = [].concat(...fileList)
    const temp = fs.createWriteStream(filePath)
    mergeFile(copyFileList, temp, fileList)
  }
}

module.exports = {
  mergeFiles
}