import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

exports.sendEmail = async options  => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: `${process.env.EMAILNAME_AUTH}`,
            pass: `${process.env.EMAILPASSWORD_AUTH}`
        }
    })

    const mailOptions = {
        from: `Phantom App <${process.env.EMAILNAME_AUTH}>`,
        to: `${options.email}`,
        subject: 'Phantom Registration Successful',
        html: `
        <div style="font-size:15px;box-shadow:4px 4px 2px;padding:10px;color:#000">
        <h1 style="font-size:25px;color:#2E86C1;border-bottom: 4px solid #2E86C1;">Phantom App</h1>
        <p style="color:#000;font-size:17px">Thank you for registering on Phantom app.
        You should use the credentials below to sign in:<p>
        Email: <b style="color:#2E86C1">${options.email}</b><br>
        Password: <b style="background-color:#2E86C1;color:#fff">${options.password}</b>
        </div>
        `
    }

    await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return false
        } else {
            console.log('Email sent: ' + info.response);
            return true
        }
    })
}