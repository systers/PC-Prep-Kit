// Import dependencies
const smtpTransport = require('nodemailer-smtp-transport');
const moment = require('moment');
const config = require('../config/settings');
const _      = require('lodash');
const jwt    = require('jsonwebtoken');
const authenticationHelpers = require('./authenticationHelpers');
const utilityFunctions = require('./utilityfunctions');

// create reset password token
function createToken(user) {
    return jwt.sign(_.omit(user, 'password'), config.secretKey, { expiresIn: 60*60*5 });
}

const validateEmail = utilityFunctions.validateEmail;

function sendEmail(recipient, subject, content, user, nodemailer, done) {
    const transport = nodemailer.createTransport(smtpTransport({
        service: config.nodeMailer.PROVIDER,
        auth: {
            user: config.nodeMailer.EMAIL,
            pass: config.nodeMailer.PASSWORD
        }
    }));
    const mailOptions = {
        to: recipient,
        from: config.nodeMailer.EMAIL,
        subject: subject,
        text: content
    };
    transport.sendMail(mailOptions, function(err) {
        done(err, user);
    });
}

module.exports = function(router, passport, async, nodemailer, crypto, models) {

    const localUser = models.user_account;

    router.post('/login', function(req, res, next) {
        passport.authenticate('local-login', function(err, user, info) {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.status(200).json(info);
            }
            req.logIn(user, function(err) {
                if (err) {
                    return next(err);
                }
                return res.status(200).json({user: user, token: createToken(user)});
            });
        })(req, res, next);
    });

    router.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}));

    router.get('/google/callback',
        passport.authenticate('google', { successRedirect: '/home',
            failureRedirect: '/' }));

    router.get('/logout', authenticationHelpers.isAuthOrRedirect, function(req, res) {
        req.logout();
        res.json({loggedOut: req.isAuthenticated()});
    });

    router.get('/authenticated', authenticationHelpers.isAuth, function(req, res) {
        res.json({authenticated: true, token:createToken(req.user)});
    });

    // Forgot password and generate token
    router.post('/forgot', function(req, res) {
        if(!req.body.email || !validateEmail(req.body.email)) {
            return res.status(400).json({error:'Email is invalid'});
        }
        async.waterfall([
            function(done) {
                crypto.randomBytes(20, function(err, buf) {
                    const token = buf.toString('hex');
                    done(err, token);
                });
            },
            function(token, done) {
                const user = {email:req.body.email};
                localUser.find({where: {
                    email: req.body.email,
                    provider: 'local'
                }}, {raw: true})
                    .then(data => {
                        if(!data) {
                            return res.status(200).json({info:'This account does not exist or you cannot change the password for this account'});
                        }
                        const date = moment(moment.now() + 60*60*1000).format('YYYY-MM-DD HH:mm:ss');
                        localUser.update({
                            resetPasswordToken: token,
                            resetPasswordExpires: date
                        }, {
                            where: {
                                email: req.body.email,
                                provider: 'local'
                            }
                        })
                            .then(function(data) {
                                const to = req.body.email;
                                const subject = 'PC PREP KIT Password Reset';
                                const text = `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\nPlease click on the following link, or paste this into your browser to complete the process:\n\nhttp://${req.headers.host}/auth/reset/${token} \n\nIf you did not request this, please ignore this email and your password will remain unchanged.\n`;
                                sendEmail(to, subject, text, user, nodemailer, done);
                            })
                            .catch(function(err) {
                                return res.status(500).json({error:'Something went wrong'});
                            });
                    }).catch(function(err) {
                        return res.status(500).json({error:'Something went wrong'});
                    });
            }
        ],
        function(err, user) {
            if(err) {
                return res.status(500).json({error:'Something went wrong'});
            }
            const successMessage = `An e-mail has been sent to ${user.email} with further instructions`;
            return res.status(200).json({success: successMessage});
        });
    });

    router.get('/reset/:token', function(req, res) {
        if(!req.params.token) {
            return res.status(400).json({error:'Password reset token is invalid or has expired'});
        }
        localUser.find({where: {
            resetPasswordToken: req.params.token,
            provider: 'local',
            resetPasswordExpires: {
                $gte: Date.now()
            }
        }}, {raw: true})
            .then(data => {
                if(!data) {
                    return res.status(200).json({info:'Password reset token is invalid or has expired'});
                }
                res.redirect(`/reset/${req.params.token}`);
            }).catch(function(err) {
                return res.status(500).json({error:'Something went wrong'});
            });
    });

    // Reset Password
    router.put('/reset/:token', function(req, res) {
        async.waterfall([
            function(done) {
                localUser.find({where: {
                    resetPasswordToken: req.params.token,
                    resetPasswordExpires: {
                        $gte: Date.now()
                    }
                }}, {raw: true})
                    .then(data => {
                        if(!data) {
                            return res.status(200).json({info:'Password reset token is invalid or has expired'});
                        }
                        const user = {email:data.email};
                        localUser.update({
                            resetPasswordToken: null,
                            resetPasswordExpires: null,
                            password: req.body.password
                        }, {
                            where: {
                                resetPasswordToken: req.params.token,
                                provider: 'local'
                            }
                        })
                            .then(data => {
                                if(!data) {
                                    return res.status(500).json({error:'Something went wrong'});
                                }
                                const to = user.email;
                                const subject = 'Your password has been changed';
                                const text = `Hello,\n\nThis is a confirmation that the password for your account ${user.email} has just been changed.\n`;
                                sendEmail(to, subject, text, user, nodemailer, done);
                            }).catch(function(err) {
                                return res.status(500).json({error:'Something went wrong'});
                            });
                    }).catch(function(err) {
                        return res.status(500).json({error:'Something went wrong'});
                    });
            }
        ],
        function(err, user) {
            if (err) {
                return res.status(500).json({error:'Something went wrong'});
            }
            return res.status(200).json({success: 'Success! Your password has been changed.'});
        });
    });
};
