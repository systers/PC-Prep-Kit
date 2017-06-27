const express = require('express');
const router = express.Router();

const mail = require('./mailService');
const models = require('../database/models');
const functions = require('./utilityfunctions');

const localUser = models.user_account;
const validateEmail=functions.validateEmail;
const randomStr=functions.randomString;
// Receiving HTTP Post
router.post('/', function(req, res){
    if(!req.body.email || !validateEmail(req.body.email)) {
        return res.status(400).json({error:'Email is invalid'});
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
            functions.sendEmail();
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
