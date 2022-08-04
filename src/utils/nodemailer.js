const { createTransport } = require('nodemailer');

const TEST_MAIL = process.env.TEST_MAIL || 'susanna.kulas8@ethereal.email'
const TEST_MAIL_PWD = process.env.TEST_MAIL_PWD || 'kd92YFfQjPb5aZtQPE'

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

module.exports= {transporter, defaultMailOptions}