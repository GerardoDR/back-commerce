// require('dotenv').config()

module.exports = {
  PORT: process.env.PORT || 3001,
  EXEC_MODE: process.env.EXEC_MODE || 'FORK',
  MONGO_URI: process.env.MONGO_URI,
  TIEMPO_EXPIRACION: process.env.TIEMPO_EXPIRACION || 600000,
  SESSION_SECRET: process.env.SESSION_SECRET,
  ADM_TEL: process.env.ADM_TEL,
  SRV_TEL: process.env.SRV_TEL,
  SRV_WSP: process.env.SRV_WSP,
  TWL_SID:  process.env.TWL_SID,
  TWL_TOKEN:  process.env.TWL_TOKEN,
  TEST_MAIL: process.env.TEST_MAIL,
  TEST_MAIL_PWD: process.env.TEST_MAIL_PWD
}