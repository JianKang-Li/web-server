const fs = require('fs')
const crypto = require('crypto')


// --- 配置参数 ---
const algorithm = 'aes-256-cbc' // 使用 AES-256-CBC 算法
const iterations = 30 // PBKDF2 迭代次数，越高越安全但越慢
const keylen = 32 // AES-256 需要 32 字节 (256位) 的密钥
const digest = 'sha512' // PBKDF2 使用的哈希算法
const encoding = 'hex' // 存储和显示加密/解密结果的编码格式 (hex 或 base64)
const sk = 'chatboxnb'


// --- 加密函数 ---
function encrypt(password, plaintext) {
  // 1. 生成随机的盐 (salt)
  const salt = crypto.randomBytes(16)

  // 2. 使用 PBKDF2 从密码和盐派生密钥
  const key = crypto.pbkdf2Sync(password, salt, iterations, keylen, digest)

  // 3. 生成随机的初始化向量 (IV)
  const iv = crypto.randomBytes(16) // AES-CBC 需要一个 16 字节的 IV

  // 4. 创建加密器
  const cipher = crypto.createCipheriv(algorithm, key, iv)

  // 5. 加密数据
  let ciphertext = cipher.update(plaintext, 'utf8', encoding)
  ciphertext += cipher.final(encoding)

  // 6. 返回: 盐 + IV + 密文 (需要按此顺序存储，以便解密时正确解析)
  // 注意：这里简单地将它们连接起来，实际应用中可能需要更结构化的方式存储
  // 例如，可以分别存储盐、IV 和密文，或者将它们打包成一个 JSON 对象
  return salt.toString('hex') + ':' + iv.toString('hex') + ':' + ciphertext
}

// --- 解密函数 ---
function decrypt(password, encryptedData) {
  // 1. 解析加密数据，提取盐、IV 和密文
  const parts = encryptedData.split(':')
  if (parts.length !== 3) {
    throw new Error('加密数据格式不正确')
  }
  const salt = Buffer.from(parts[0], 'hex')
  const iv = Buffer.from(parts[1], 'hex')
  const ciphertext = parts[2]

  // 2. 使用相同的密码、盐和参数重新派生密钥
  const key = crypto.pbkdf2Sync(password, salt, iterations, keylen, digest)

  // 3. 创建解密器
  const decipher = crypto.createDecipheriv(algorithm, key, iv)

  // 4. 解密数据
  let plaintext = decipher.update(ciphertext, encoding, 'utf8')
  plaintext += decipher.final('utf8')

  return plaintext
}

function getToken(name, password) {
  return encrypt(sk, `${name}-${password}-${Date.now() + 60000 * 60 * 24 * 5}`) // 5天有效期
}

function sureToken(token) {
  const context = JSON.parse(fs.readFileSync(`./files/user.json`, 'utf-8'))
  try {
    const arr = decrypt(sk, token).split('-')
    if (context[arr[0]] === arr[1] && parseInt(arr[2]) > Date.now()) {
      return true
    }

    return false
  } catch (e) {
    return false
  }
}

module.exports = {
  getToken,
  sureToken
}