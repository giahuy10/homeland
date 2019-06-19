nodeMailer = require('nodemailer')

var sendMail = (to, subject, text = '', html) => {
  let transporter = nodeMailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
          user: 'homenland2019@gmail.com',
          pass: 'giahuytk102L'
      }
  });
  let mailOptions = {
      from: '"HomenLand" <homenland2019@gmail.com>', // sender address
      to: to, // list of receivers
      subject: subject, // Subject line
      text: text, // plain text body
      html: html // html body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return error
    }
    return info
  })
}

module.exports = sendMail
