const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

const mail = require('./mailService');
const models = require('../database/models');
const utilityFunctions = require('./utilityfunctions');
const handlebars = require('handlebars');

const localUser = models.user_account;
const infokit = models.info_kit;
const progress = models.progress;
const verification = models.verification;
const validateEmail = utilityFunctions.validateEmail;
const validateName = utilityFunctions.validateName;
const validatePassword = utilityFunctions.validatePassword;
const randomStr = utilityFunctions.randomString;
const readHTMLFile = utilityFunctions.readHTMLFile;
const fs = require('fs');

const codes = JSON.parse(fs.readFileSync('./data/codes.json'));
const errorCode = codes.errors;
const successCode = codes.success;

const otherData = JSON.parse(fs.readFileSync('./data/english.json'));
const mailData = otherData.mail;
const mailFooterData = otherData.mail.footer;
const mailHeaderData = otherData.mail.header;

function verificationMail(req, res, rString) {
    readHTMLFile('./public/pages/registration-verification.html', function(err, html) {
        const template = handlebars.compile(html);
        const replacements = {
            host: req.headers.host,
            token: rString,
            email: req.body.email,
            title: mailData.registration.title,
            preHeader: mailData.registration.preHeader,
            brandTitle1: mailHeaderData.brandTitle1,
            brandTitle2: mailHeaderData.brandTitle2,
            greeting: mailData.registration.greeting,
            textContent1: mailData.registration.textContent.textContent1,
            textContent2: mailData.registration.textContent.textContent2,
            textContent3: mailData.registration.textContent.textContent3,
            textContent4: mailData.registration.textContent.textContent4,
            callToAction: mailData.registration.callToAction,
            signatureGreet: mailData.registration.signature.endGreet,
            signatureSignOff: mailData.registration.signature.signOff,
            footerText1: mailFooterData.textContent1,
            footerText2: mailFooterData.copyrights

        };
        const htmlToSend = template(replacements);
        mail.mailOptions.to = req.body.email;
        mail.mailOptions.subject = mailData.registration.subject;
        mail.mailOptions.html = htmlToSend;
        mail.smtpTransport.sendMail(mail.mailOptions, function(error) {
            if (error) {
                res.status(500).json({error: errorCode.PCE001.message, code: errorCode.PCE001.code});
            } else {
                res.json(successCode.PCS005.message);
            }
        });
    });
}
// Receiving HTTP Post
router.post('/', function(req, res) {
    if (!req.body.email || !validateEmail(req.body.email)) {
        return res.status(400).json({error: errorCode.PCE002.message, code: errorCode.PCE002.code});
    }

    if (!req.body.fname || !validateName(req.body.fname)) {
        return res.status(400).json({error: errorCode.PCE003.message, code: errorCode.PCE003.code});
    }

    if (!req.body.lname || !validateName(req.body.lname)) {
        return res.status(400).json({error: errorCode.PCE004.message, code: errorCode.PCE004.code});
    }

    if (!req.body.password || !validatePassword(req.body.password)) {
        return res.status(400).json({error: errorCode.PCE005.message, code: errorCode.PCE005.code});
    }
    const rString = randomStr(50, mailData.registration.verificationToken);
    bcrypt.hash(req.body.password, 10, function(err, hash) {
        if (err) {
            return res.status(500).json({error: errorCode.PCE030.message, code: errorCode.PCE030.code});
        }
        localUser.create({
            fname: req.body.fname,
            lname: req.body.lname,
            email: req.body.email,
            password: hash,
            provider: 1
        }).then(task => {
            verification.create({
                verificationCode: rString,
                user_id: task.dataValues.id
            }).then(task => {
                verificationMail(req, res, rString);
            }).catch(error => {
                if (error) {
                    res.status(500).json({error: errorCode.PCE006.message, code: errorCode.PCE006.code});
                }
            });
        })
    });
});

module.exports = router;

