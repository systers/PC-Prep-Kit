const express = require('express');
const router = express.Router();
const models = require('../database/models');
const authenticationHelpers = require('./authenticationHelpers');
const localUser = models.user_account;
const fs = require('fs');
const codes = JSON.parse(fs.readFileSync('./data/codes.json'));
const errorCode = codes.errors;
const successCode = codes.success;

router.patch('/', authenticationHelpers.isAuthOrRedirect, (req, res) => {
    if (req.body) {
        localUser.find({
            where: {
                email: req.user.email
            }
        }, {raw: true}).then( () => {
            const updatedFirstName = req.body.firstName;
            const updatedLastName = req.body.lastName;
            localUser.update({
                fname: updatedFirstName,
                lname: updatedLastName
            },  {
                where: {
                    email: req.user.email
                }
            }).then( () => {return res.status(200).json({info: successCode.PCS006.message, code: successCode.PCS006.code});})

        }).catch(function() {
            return res.status(500).json({error: errorCode.PCE028.message, code: errorCode.PCE028.code});
        });
    } else {
        return res.status(400).json({error: errorCode.PCE029.message, code: errorCode.PCE029.code});

    }
});
module.exports = router;


