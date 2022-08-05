const {TWL_SID, TWL_TOKEN, ADM_TEL, SRV_TEL, SRV_WSP} = require('../config/globals')
const { logger } = require("./logger")

const twilio = require('twilio')
const client = twilio(TWL_SID, TWL_TOKEN)

const defaultTWLOptions = {
    body: 'Hola soy un WSP desde Node.js!',
    from: `whatsapp:${SRV_WSP}`,
    to: `whatsapp:${ADM_TEL}`
}
const defaultSMSOptions = {
    body: 'Hola soy un SMS desde Node.js!',
    from: SRV_TEL,
    to: ADM_TEL
}

async function sendMessage(options){
   try {
      await client.messages.create(options)
   } catch (error) {
      logger.error(error)
   }
}

module.exports = {sendMessage, defaultTWLOptions, defaultSMSOptions};