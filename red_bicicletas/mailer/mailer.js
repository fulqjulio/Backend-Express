const nodemailer = require('nodemailer');

const mailConfig = {
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'rosina.mertz@ethereal.email',
        pass: 'jynQ6SJ6bqY9v8ZQJR'
    }
}; 

/* const sgtTransport = require('nodemailer-sendgrid-transport');

let mailConfig;
if (process.env.NODE_ENV === 'production'){
    console.log('XXX-production-XXX');
    const options = {
        auth: {
            api_key: process.env.SENDGRID_API_SECRET
        }
    }
    mailConfig = sgtTransport(options);
}else{
    if (process.env.NODE_ENV === 'staging'){
        console.log('XXX-staging-XXX');
        const options = {
            auth: {
                api_key: process.env.SENDGRID_API_SECRET
            }
        }
        mailConfig = sgtTransport(options);
    }else{
        console.log('XXX-development-XXX');
        mailConfig = {
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'rosina.mertz@ethereal.email',
                pass: 'jynQ6SJ6bqY9v8ZQJR'
                // user: process.env.user_ethereal_mail,
                // pass: process.env.password_etheral_mail
            }
        };
    }

} */

module.exports = nodemailer.createTransport(mailConfig);