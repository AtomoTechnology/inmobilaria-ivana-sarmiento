const nodemailer = require('nodemailer')
const pug = require('pug')

module.exports = class Email {

  constructor(data) {
    this.data = data
    this.from = `Administración de Consorcios y Propiedades<${process.env.EMAIL_FROM}>`
  }

  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      // Sendgrid
      return nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
          user: process.env.SENDGRID_USERNAME,
          pass: process.env.SENDGRID_PASSWORD
        }
      })
    }

    return nodemailer.createTransport({
      // host: process.env.EMAIL_HOST,
      // port: process.env.EMAIL_PORT,
      // auth: {
      //   user: process.env.EMAIL_USERNAME,
      //   pass: process.env.EMAIL_PASSWORD,
      // },
      host: 'smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: '5bd15bd76859d7',
        pass: '27fa67a062f87b'
      }
    })
  }

  async send(template, subject) {
    // 1) Render HTML based on a pug template
    const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
      data: this.data,
      subject
    })

    // 2) Define email options
    const mailOptions = {
      from: this.from,
      to: this.data.email,
      subject,
      html
      // text: htmlToText.fromString(html),
    }

    // 3) Create a transport and send email
    await this.newTransport().sendMail(mailOptions)
  }

  // async sendWelcome() {
  //     await this.send('welcome', 'Welcome to the Natours Family!');
  // }
  async contact() {
    await this.send('contact', 'Nuevo mensaje de ' + this.from)
  }

  async sendPasswordReset() {
    await this.send('passwordReset', 'Recuperacion de contraseña válida por 10 minutos')
  }
  async sendExpireContract() {
    await this.send('expireContract', 'Contrato por vencer')
  }
  async sendNoticeDebtForOneMonth() {
    await this.send('debtOneMonth', '1 debt notice')
  }
  async sendNoticeDebtForTwoMonth() {
    await this.send('debtTwoMonth', '2 debt notice')
  }
  async sendNoticeDebtForThreeMonth() {
    await this.send('debtThreeMonth', '3 debt notice')
  }
  async sendNoticeDebtForFourMonth() {
    await this.send('debtFourMonth', '4 debt notice')
  }
  async sendNoticeDebtForAssurance() {
    await this.send('noticeForAssurance', 'ASSURANCE NOTICE')
  }
}
