const express = require('express');
const router = express.Router();

const mail = require('./mailService');
const models = require('../database/models');
const utilityfunctions = require('./utilityfunctions');

const localUser = models.user_account;
const validateEmail = utilityfunctions.validateEmail;
const validateName = utilityfunctions.validateName;
const validatePassword = utilityfunctions.validatePassword;
const randomStr = utilityfunctions.randomString;
// Receiving HTTP Post
router.post('/', function(req, res){
    if(!req.body.email || !validateEmail(req.body.email)) {
        return res.status(400).json({error:'Email is invalid'});
    }

    if(!req.body.fname || !validateName(req.body.fname)) {
        return res.status(400).json({error:'First Name is invalid'});
    }

    if(!req.body.lname || !validateName(req.body.lname)) {
        return res.status(400).json({error:'Last Name is invalid'});
    }

    if(!req.body.password || !validatePassword(req.body.password)) {
        return res.status(400).json({error:'Password is invalid'});
    }
    const rString = randomStr(50, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
    localUser.create({
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        password: req.body.password,
        verificationCode: rString,
        provider:1 })
        .then(task => {
            utilityfunctions.sendEmail();
            mail.mailOptions.to=req.body.email;
            mail.mailOptions.subject='PC PrepKit Email Verification';
            mail.mailOptions.html="<b>Click on the link to complete the verification</b> <a href='http://localhost:3000/verification?token=" + rString + "&user=" + req.body.email +"'>Verify</a>";
            mail.smtpTransport.sendMail(mail.mailOptions, function(error){
                if(error){
                    res.status(500).json({error:'Something Went Wrong! Try again later.'});
                }else{
                    res.json('Verification Mail Sent, Please check your mail.');
                }
            }
        )
        }).catch(error => {
            if(error){
                res.status(500).json({error:'Something went wrong'});
            }
        });
});

module.exports = router;
