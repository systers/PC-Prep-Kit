const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

const mail = require('./mailService');
const models = require('../database/models');
const utilityFunctions = require('./utilityfunctions');
const config = require('../config/settings');

const localUser = models.user_account;
const infokit = models.info_kit;
const progress = models.progress;
const verification = models.verification;
const validateEmail = utilityFunctions.validateEmail;
const validateName = utilityFunctions.validateName;
const validatePassword = utilityFunctions.validatePassword;
const randomStr = utilityFunctions.randomString;

function verificationMail(req, res, rString) {
    mail.mailOptions.to = req.body.email;
    mail.mailOptions.subject = 'PC PrepKit Email Verification';
    mail.mailOptions.html = `<b>Click on the link to complete the verification</b> <a href='${config.basePath}verification?token=${rString}&user=${req.body.email}'>Verify</a>`;
    mail.smtpTransport.sendMail(mail.mailOptions, function(error) {
        if (error) {
            res.status(500).json({error: 'Something Went Wrong! Try again later.'});
        } else {
            res.json('Verification Mail Sent, Please check your mail.');
        }
    });
}
// Receiving HTTP Post
router.post('/', function(req, res) {
    if (!req.body.email || !validateEmail(req.body.email)) {
        return res.status(400).json({error: 'Email is invalid'});
    }

    if (!req.body.fname || !validateName(req.body.fname)) {
        return res.status(400).json({error: 'First Name is invalid'});
    }

    if (!req.body.lname || !validateName(req.body.lname)) {
        return res.status(400).json({error: 'Last Name is invalid'});
    }

    if (!req.body.password || !validatePassword(req.body.password)) {
        return res.status(400).json({error: 'Password is invalid'});
    }
    const rString = randomStr(50, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
    bcrypt.hash(req.body.password, 10, function(err, hash) {
        if (err) {
            return res.status(500).json({error: 'Something went wrong'});
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
                    res.status(500).json({error: 'Something went wrong'});
                }
            });
        })
    });
});

module.exports = router;
