const nodemailer = require('nodemailer');
const config = require('../config/settings');

// create reusable transport method (opens pool of SMTP connections)
let smtpTransport = nodemailer.createTransport({
    service: config.nodeMailer.PROVIDER,
    auth: {
        user: config.nodeMailer.EMAIL,
        pass: config.nodeMailer.PASSWORD
    }
});

// setup e-mail data with unicode symbols
let mailOptions = {
    from: 'PC PrepKit<noreply@pcprepkit.com>', // sender address
    to: '', // list of receivers
    subject: '', // Subject line
    text: '', // plaintext body
    html: '' // html body
}

module.exports = {
    mailOptions: mailOptions,
    smtpTransport: smtpTransport,
};
