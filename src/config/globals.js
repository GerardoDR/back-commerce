require('dotenv').config()

module.exports = {
  MONGO_URI: process.env.MONGO_URI,
  TIEMPO_EXPIRACION: process.env.TIEMPO_EXPIRACION || 600000,
  SESSION_SECRET: process.env.SESSION_SECRET
}