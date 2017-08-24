const express = require('express');
const router = express.Router();

const models = require('../database/models');
const localUser = models.user_account;
const verification = models.verification;

router.get('/', function(req, res) {
    const email = req.query.user;
    const token = req.query.token;

    localUser.find({where: {
        email: email,
    }}, {raw: true})
        .then(data => {
            verification.find({
                where: {
                    verificationCode: token,
                    user_id: data.dataValues.id
                }
            }).then(data => {
                if (!data) {
                    res.redirect('/login?msg=couldn\'t Verify');
                }
                localUser.update({
                    verificationStatus: true
                }, {
                    where: {
                        email: email
                    }
                }).then(task => {
                    res.redirect('/login?msg=Verified Successfully! You can now login');
                })
                .catch(error => {
                    if (error) {
                        res.redirect('/login?msg=couldn\'t Verify');
                    }
                });
            });
        });
});

module.exports = router;
