const dir = '../public/files/'
const fs = require('fs')
const path = require('path')
const currentFilePath = path.resolve(__filename)

// function mergeFile(fileList, fileWriteStream) {
//   if (!fileList.length) {
//     // 最后关闭可写流，防止内存泄漏
//     // 关闭流之前立即写入最后一个额外的数据块(Stream 合并完成)。
//     fileWriteStream.end()
//     fileWriteStream.close()
//     console.log('---写入完成---')
//     return
//   }
//   const chunkFilePath = fileList.shift()
//   // 获取当前的可读流
//   const currentReadStream = fs.createReadStream(chunkFilePath)
//   // 监听currentReadStream的on('data'),将读取到的内容调用fileWriteStream.write方法
//   // end:true 读取结束时终止写入流,设置 end 为 false 写入的目标流(fileWriteStream)将会一直处于打开状态，不自动关闭
//   currentReadStream.pipe(fileWriteStream, { end: false })
//   // 监听可读流的 end 事件，结束之后递归合并下一个文件 或者 手动调用可写流的 end 事件
//   currentReadStream.on('end', () => {
//     mergeFile(fileList, fileWriteStream)
//     fs.access(chunkFilePath, fs.constants.F_OK,(err)=> {
//       fs.unlinkSync(chunkFilePath)
//     })
//   })

//   // 监听错误事件，关闭可写流，防止内存泄漏
//   currentReadStream.on('error', (error) => {
//     fileWriteStream.close()
//   })
// }

function mergeFile(fileList, fileWriteStream) {
  return new Promise((resolve, reject) => {
    let hasError = false // 错误标志位

    // 监听可写流的错误事件
    fileWriteStream.on('error', (error) => {
      if (hasError) return
      hasError = true
      cleanup()
      reject(new Error(`可写流错误: ${error.message}`))
    })

    // 递归合并函数
    const mergeNext = () => {
      if (hasError) return // 如果已出错则终止

      if (fileList.length === 0) {
        // 所有文件合并完成
        fileWriteStream.end(() => {
          console.log('---写入完成---')
          resolve()
        })
        return
      }

      const chunkFilePath = fileList.shift()
      const currentReadStream = fs.createReadStream(chunkFilePath)

      // 监听可读流错误
      currentReadStream.on('error', (error) => {
        if (hasError) return
        hasError = true
        cleanup()
        reject(new Error(`读取文件 ${chunkFilePath} 失败: ${error.message}`))
      })

      // 管道传输数据
      currentReadStream.pipe(fileWriteStream, { end: false })

      // 当前文件读取完成
      currentReadStream.on('end', () => {
        // 异步删除文件，不阻塞主流程
        fs.unlink(chunkFilePath, (err) => {
          if (err) console.error(`删除临时文件失败: ${chunkFilePath}`, err)
        })

        // 继续处理下一个文件
        mergeNext()
      })
    }

    // 资源清理函数
    const cleanup = () => {
      try {
        fileWriteStream.end()
        fileWriteStream.destroy()
      } catch (cleanupError) {
        console.error('清理资源时出错:', cleanupError)
      }
    }

    // 开始合并流程
    mergeNext()
  })
}

function mergeFiles(name, total, totalSize) {
  const fileList = []
  let flag = true
  let error = null

  for (let i = 0; i < total; i++) {
    const fileName = path.join(path.dirname(currentFilePath), dir, `${name}-chunk-${i}`)
    fileList.push(fileName)

    fs.access(fileName, fs.constants.F_OK, (err) => {
      if (err) {
        flag = false
        error = err
      }
    })
  }

  if (flag) {
    const filePath = path.join(path.dirname(currentFilePath), dir, name)
    const copyFileList = [].concat(...fileList)
    const temp = fs.createWriteStream(filePath)
    return mergeFile(copyFileList, temp, fileList)
  }

  return Promise.reject(error)
}

module.exports = {
  mergeFiles
}