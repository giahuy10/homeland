var nodemailer =  require('nodemailer'); // khai báo sử dụng module nodemailer
var sendMail = (subject, text, html) => {
    var transporter =  nodemailer.createTransport({ // config mail server
        // service: 'Gmail',
        host: "in-v3.mailjet.com",
        port: 587,
        secure: false,
        auth: {
            user: '3408304d4aaf8407c4aa1ed1598ccf62',
            pass: '985a590344fad3534ba38aed6ab66e55'
        }
    })
    var mainOptions = { // thiết lập đối tượng, nội dung gửi mail
        from: 'Homenland Website',
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
