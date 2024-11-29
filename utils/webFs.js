const fs = require('fs')
class webFs {
  constructor() {
    this.basePath = './public/files/'
    this.excludedFiles = ['.gitkeep']
  }

  create(type, name, path) {
    switch (type) {
      case 'dir': {
        try {
          const newPath = `${this.basePath}${path}/${name}`
          if (!fs.existsSync(newPath)) {
            fs.mkdirSync(newPath)
            return {
              status: true
            }
          }
        } catch (e) {
          return {
            status: false,
            error: e
          }
        }
      }
      default: {
        return { status: true }
      }
    }
  }

  countTotal(path = '') {
    let idx = 0
    const menu = fs.readdirSync(`${this.basePath}${path}`, { withFileTypes: true })

    menu.forEach(x => {
      if (!this.excludedFiles.includes(x.name)) {
        idx++
      }
    })

    return idx
  }

  read(path, size, page) {
    const menu1 = []
    const total = this.countTotal(path)
    const menu = fs.readdirSync(`${this.basePath}${path}`, { withFileTypes: true })

    if (!menu.length) {
      return {
        total: 0
      }
    }

    for (let i = 1; i <= size; i++) {
      const index = (page - 1) * size + i

      if (index >= menu.length) {
        break
      }

      const item = menu[index]

      if (!this.excludedFiles.includes(item.name)) {
        let obj = {
          filename: item.name,
          index,
          isDir: item.isDirectory(),
        }
        menu1.push(obj)
      }
    }
    return {
      total,
      menu: menu1
    }
  }
}

module.exports = webFs
