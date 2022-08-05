const {TEST_MAIL, TEST_MAIL_PWD }= require('../config/globals')
const { createTransport } = require('nodemailer');
const { logger } = require("./logger")

const transporter = createTransport({
   host: 'smtp.ethereal.email',
   port: 587,
   auth: {
       user: TEST_MAIL,
       pass: TEST_MAIL_PWD
   }
});

const defaultMailOptions = {
    from: 'NODEMAILER',
    to: TEST_MAIL,
    subject: 'REPORTE DESDE NODE JS',
    html: '<h1 style="color: blue;">Contenido de prueba desde <span style="color: green;">Node.js con Nodemailer</span></h1>'
}

async function sendMail(options){
    try {
        const info = await transporter.sendMail(options)
        logger.info(info)
     } catch (error) {
        logger.error(error)
     }
}

module.exports= {sendMail, defaultMailOptions}