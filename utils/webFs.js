const fs = require('fs')
class webFs {
  constructor() {
    this.basePath = './public/files/'
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
}

module.exports = webFs