var nodemailer =  require('nodemailer'); // khai báo sử dụng module nodemailer
var sendMail = (subject, text, html) => {
    var transporter =  nodemailer.createTransport({ // config mail server
        service: 'Gmail',
        // host: "smtp.ethereal.email",
        // port: 587,
        // secure: false, // true for 465, false for other ports
        auth: {
            user: 'vsqisoft@gmail.com',
            pass: 'htecom.vn'
        }
    })
    var mainOptions = { // thiết lập đối tượng, nội dung gửi mail
        from: 'HomenLand Website',
        to: 'anjakahuy@gmail.com',
        subject: subject,
        text: text,
        html: html
    }
    transporter.sendMail(mainOptions, function(err, info){
        if (err) {
            return err
        } else {
            return info.response
        }
    })

}

module.exports = sendMail
