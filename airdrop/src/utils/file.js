function fileSplit(file, size = 1024*100) {
  const originSize = file.size
  const fileList = []

  if (originSize > size) {
    const length = Math.floor(originSize / size) + 1
    const blobRaw = new Blob([file])

    for(let i = 0; i<= length; i++) {
      fileList.push({
        raw: new File([blobRaw.slice(size*i,size*(i+1))], `${file.name}-chunk-${i}`, {type: file.type}),
        total: length,
        totalSize: originSize
      })
    }
  } else {
    return fileList.push([
      {
        raw: file,
        total: 1,
        totalSize: file.size
      }
    ])
  }

  return fileList
}

export default {
  fileSplit
}
