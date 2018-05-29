// Import dependencies
const smtpTransport = require('nodemailer-smtp-transport');
const moment = require('moment');
const handlebars = require('handlebars');
const config = require('../config/settings');
const _    = require('lodash');
const bcrypt  = require('bcrypt');
const jwt = require('jsonwebtoken');
const authenticationHelpers = require('./authenticationHelpers');
const utilityFunctions = require('./utilityfunctions');
const readHTMLFile = utilityFunctions.readHTMLFile;
const fs = require('fs');

const codes = JSON.parse(fs.readFileSync('./data/codes.json'));
const errorCode = codes.errors;
const successCode = codes.success;

const otherData = JSON.parse(fs.readFileSync('./data/english.json'));
const mailData = otherData.mail;
const mailFooterData = otherData.mail.footer;
const mailHeaderData = otherData.mail.header;

/**
 * create authentication token
 * @param  {Object} user Create authentication token using user data
 */
function createToken(user) {
    return jwt.sign(_.omit(user, 'password'), config.secretKey, { expiresIn: 60 * 60 * 5 });
}

const validateEmail = utilityFunctions.validateEmail;

/**
 * utility function to send email using nodemailer
 * @param  {String}   recipient  recipient of mail
 * @param  {String}   subject    Subject of mail
 * @param  {String}   content    Content of mail
 * @param  {Object}   user       User object
 * @param  {Object}   nodemailer Module instance to send mail
 * @param  {Function} done       Callback function
 */
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
        html: content
    };
    transport.sendMail(mailOptions, function(err) {
        done(err, user);
    });
}

module.exports = function(router, passport, async, nodemailer, crypto, models) {
    const localUser = models.user_account;
    /**
   * Handle local login
   *  @param  {Object} req   Request object
   *  @param  {Object} res   Response object
   *  @param  {Object} next  Callback to the next function to be executed
    */
    router.post('/login', function(req, res, next) {
        passport.authenticate('local-login', function(err, user, info) {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.status(200).json({error: errorCode.PCE008.message, code: errorCode.PCE008.code});
            }
            req.logIn(user, function(err) {
                if (err) {
                    return next(err);
                }
                return res.status(200).json({user: user, token: createToken(user)});
            });
        })(req, res, next);
    });

    // Handle Google login
    router.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}));

    // Handle callback after Google login
    router.get('/google/callback',
        passport.authenticate('google', { successRedirect: '/',
            failureRedirect: '/login' }));

    /**
      * Handle logout
      * @param  {Object} req  Request object
      * @param  {Object} res  Response object
      */
    router.get('/logout', authenticationHelpers.isAuthOrRedirect, function(req, res) {
        req.logout();
        res.json({loggedOut: req.isAuthenticated()});
    });

    /**
      * Create and send authentication token to client
      * @param  {Object} req  Request object
      * @param  {Object} res  Response object
      */
    router.get('/authenticated', authenticationHelpers.isAuth, function(req, res) {
        res.json({authenticated: true, token: createToken(req.user)});
    });

    /**
    * Handle forgot password and generate reset password token
    * @param  {Object} req  Request object
    * @param  {Object} res  Response object
    */
    router.post('/forgot', function(req, res) {
        if (!req.body.email || !validateEmail(req.body.email)) {
            return res.status(400).json({error: errorCode.PCE002.message, code: errorCode.PCE002.code});
        }
        async.waterfall([
            function(done) {
                crypto.randomBytes(20, function(err, buf) {
                    const token = buf.toString('hex');
                    done(err, token);
                });
            },
            function(token, done) {
                const user = {email: req.body.email};
                localUser.find({where: {
                    email: req.body.email,
                    provider: 'local'
                }}, {raw: true})
                    .then(data => {
                        if (!data) {
                            return res.status(200).json({info: errorCode.PCE011.message, code: errorCode.PCE011.code});
                        }
                        const date = moment(moment.now() + (60 * 60 * 1000)).format('YYYY-MM-DD HH:mm:ss');
                        localUser.update({
                            resetPasswordToken: token,
                            resetPasswordExpires: date
                        }, {
                            where: {
                                email: req.body.email,
                                provider: 'local'
                            }
                        })
                            .then(function(updateData) {
                                readHTMLFile('./public/pages/forgot-password.html', function(err, html) {
                                    const template = handlebars.compile(html);
                                    const replacements = {
                                        host: req.headers.host,
                                        token: token,
                                        name: data.fname,
                                        title: mailData.forgotPassword.title,
                                        preHeader: mailData.forgotPassword.preHeader,
                                        brandTitle1: mailHeaderData.brandTitle1,
                                        brandTitle2: mailHeaderData.brandTitle2,
                                        greeting: mailData.forgotPassword.greeting,
                                        textContent1: mailData.forgotPassword.textContent.textContent1,
                                        textContent2: mailData.forgotPassword.textContent.textContent2,
                                        textContent3: mailData.forgotPassword.textContent.textContent3,
                                        textContent4: mailData.forgotPassword.textContent.textContent4,
                                        textContent5: mailData.forgotPassword.textContent.textContent5,
                                        callToAction: mailData.forgotPassword.callToAction,
                                        signatureGreet: mailData.forgotPassword.signature.endGreet,
                                        signatureSignOff: mailData.forgotPassword.signature.signOff,
                                        footerText1: mailFooterData.textContent1,
                                        footerText2: mailFooterData.copyrights
                                    };
                                    const htmlToSend = template(replacements);
                                    const to = req.body.email;
                                    const subject = mailData.forgotPassword.subject;
                                    sendEmail(to, subject, htmlToSend, user, nodemailer, done);
                                });
                            })
                            .catch(function(err) {
                                return res.status(500).json({error: errorCode.PCE012.message, code: errorCode.PCE012.code});
                            });
                    }).catch(function(err) {
                        return res.status(500).json({error: errorCode.PCE012.message, code: errorCode.PCE012.code});
                    });
            }
        ],
        function(err, user) {
            if (err) {
                return res.status(500).json({error: errorCode.PCE012.message, code: errorCode.PCE012.code});
            }
            const successMessage = `${successCode.PCS002.message1} ${user.email} ${successCode.PCS002.message2}`;
            return res.status(200).json({success: successMessage});
        });
    });

    /**
    * Check validity of reset password token
    * @param  {Object} req  Request object
    * @param  {Object} res  Response object
    */
    router.get('/reset/:token', function(req, res) {
        const errMsg = errorCode.PCE013.message;
        if (!req.params.token) {
            return res.redirect(`http://${req.headers.host}/login?err=${errMsg}`);
        }
        localUser.find({where: {
            resetPasswordToken: req.params.token,
            provider: 'local',
            resetPasswordExpires: {
                $gte: Date.now()
            }
        }}, {raw: true})
            .then(data => {
                if (!data) {
                    return res.redirect(`http://${req.headers.host}/login?err=${errMsg}`);
                }
                res.redirect(`/reset/${req.params.token}`);
            }).catch(function(err) {
                return res.status(500).json({error: errorCode.PCE014.message, code: errorCode.PCE014.code});
            });
    });

    /**
    * Handle resetting the password
    * @param  {Object} req  Request object
    * @param  {Object} res  Response object
    */
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
                        if (!data) {
                            const errMsg = errorCode.PCE013.message;
                            return res.redirect(`http://${req.headers.host}/login?err=${errMsg}`);
                        }
                        const user = {email: data.email};
                        bcrypt.hash(req.body.password, 10, function(err, hash) {
                            if (err) {
                                return res.status(500).json({error: errorCode.PCE030.message, code: errorCode.PCE030.code});
                            }
                            localUser.update({
                                resetPasswordToken: null,
                                resetPasswordExpires: null,
                                password: hash
                            }, {
                                where: {
                                    resetPasswordToken: req.params.token,
                                    provider: 'local'
                                }
                            })
                                .then(updateData => {
                                    if (!updateData) {
                                        return res.status(500).json({error: errorCode.PCE015.message, code: errorCode.PCE015.code});
                                    }
                                    readHTMLFile('./public/pages/password-reset-success.html', function(err, html) {
                                        const template = handlebars.compile(html);
                                        const replacements = {
                                            email: user.email,
                                            name: data.fname,
                                            title: mailData.passwordResetSuccess.title,
                                            preHeader: mailData.passwordResetSuccess.preHeader,
                                            brandTitle1: mailHeaderData.brandTitle1,
                                            brandTitle2: mailHeaderData.brandTitle2,
                                            greeting: mailData.passwordResetSuccess.greeting,
                                            textContent1: mailData.passwordResetSuccess.textContent.textContent1,
                                            textContent2: mailData.passwordResetSuccess.textContent.textContent2,
                                            textContent3: mailData.passwordResetSuccess.textContent.textContent3,
                                            textContent4: mailData.passwordResetSuccess.textContent.textContent4,
                                            textContent5: mailData.passwordResetSuccess.textContent.textContent5,
                                            signatureGreet: mailData.passwordResetSuccess.signature.endGreet,
                                            signatureSignOff: mailData.passwordResetSuccess.signature.signOff,
                                            footerText1: mailFooterData.textContent1,
                                            footerText2: mailFooterData.copyrights
                                        };
                                        const htmlToSend = template(replacements);
                                        const to = user.email;
                                        const subject = mailData.passwordResetSuccess.subject;
                                        sendEmail(to, subject, htmlToSend, user, nodemailer, done);
                                    });
                                }).catch(function(err) {
                                    return res.status(500).json({error: errorCode.PCE015.message, code: errorCode.PCE015.code});
                                });
                        });
                    }).catch(function(err) {
                        return res.status(500).json({error: errorCode.PCE015.message, code: errorCode.PCE015.code});
                    });
            }
        ],
        function(err, user) {
            if (err) {
                return res.status(500).json({error: errorCode.PCE015.message, code: errorCode.PCE015.code});
            }
            return res.status(200).json({success: successCode.PCS001.message, code: successCode.PCS001.code});
        });
    });
};
