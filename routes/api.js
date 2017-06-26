const express = require('express');
const router = express.Router();

const mail = require('./mailService');
const models = require('../database/models');

const localUser = models.user_account;
/* GET api listing. */
router.get('/getUserInfo', (req, res) => {
    res.status(200).json({user: req.user});
});

router.get('/username', (req, res) => {
    const email=req.user.email;
    localUser.findAll({
        where:{
            email:email
        }}).then(data => {
            const username = data[0].fname+ ' '+ data[0].lname;
            res.status(200).json({username:username});
        }
  ).catch(error => {
      if(error){
          res.status(500).json({error:'Something went wrong'});
      }
  });
});

router.get('/mailpcpolicy', (req, res) => {
    const email=req.user.email;
    mail.mailOptions.to=email;
    mail.mailOptions.subject='Peace Corps Policy';
    mail.mailOptions.html='<H2> Peace Corps Policy </H2>';
    mail.smtpTransport.sendMail(mail.mailOptions, function(error){
        if(error){
            res.status(500).json({error:'Something Went Wrong! Try again later.'});
        }else{
            res.json({message:'Mail Sent Succesfully.'});
        }
    }
)
});

module.exports = router;
