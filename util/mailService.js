const nodemailer = require("nodemailer")

exports.mailService = (recipient, subject, text) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.GMAIL_LOGIN,
            pass: process.env.GMAIL_PASSWORD,
        },
    })

    const mailOptions = {
        from: process.env.GMAIL_LOGIN,
        to: recipient,
        subject,
        text,
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error)
        } else {
            console.log(`Email sent: ${info.response}`)
        }
    })
}
