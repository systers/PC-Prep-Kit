const express = require('express');
const router = express.Router();

const authenticationHelpers = require('./authenticationHelpers');
const models = require('../database/models');

const localUser = models.user_account;

/* GET api listing. */
router.get('/getUserInfo', authenticationHelpers.isAuthOrRedirect, (req, res) => {
    res.status(200).json({user: req.user});
});

router.get('/username', authenticationHelpers.isAuthOrRedirect, (req, res) => {
    const email = req.user.email;
    localUser.findAll({
        where:{
            email: email
        }}).then(data => {
            const username = `${data[0].fname} ${data[0].lname}`;
            res.status(200).json({username:username});
        }).catch(error => {
            if(error){
                res.status(500).json({error:'Something went wrong'});
            }
        });
});

module.exports = router;
