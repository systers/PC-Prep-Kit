const express = require('express');
const router = express.Router();

const models = require('../database/models');
const localUser = models.user_account;
router.get('/', function(req, res) {
    const email = req.query.user;
    const token = req.query.token;

    localUser.find({where: {
        email: email,
        verificationCode: token
    }}, {raw: true})
        .then(data => {
            if (!data) {
                return res.status(200).json({info: 'Couldn\'t Verify'});
            }
            localUser.update({
                verificationStatus: true
            }, {
                where: {
                    email: email
                }
            }).then(task => {
                return res.json({info: 'Verified Successfully! You can now login'});
            });
        })
        .catch(error => {
            if (error) {
                res.status(500).json({error: 'Something went wrong'});
            }
        });
});

module.exports = router;
