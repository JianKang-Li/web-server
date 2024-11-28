function fileSplit(file, size = 1024 * 100) {
  const originSize = file.size
  const fileList = []

  if (originSize > size) {
    const length = Math.floor(originSize / size) + 1
    const blobRaw = new Blob([file.raw])

    for (let i = 0; i < length; i++) {
      const fileChunk = {
        raw: new File([blobRaw.slice(size * i, size * (i + 1))], `${file.name}-chunk-${i}`, { type: file.type }),
        total: length,
        totalSize: originSize
      }

      fileList.push(fileChunk)
    }
  } else {
    fileList.push({
      raw: file.raw,
      total: 1,
      totalSize: file.size
    })
  }

  return fileList
}

function Byte2MB(size) {
  return size / (1024 * 1024)
}

export default {
  fileSplit,
  Byte2MB
}
