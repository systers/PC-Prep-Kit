const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const configAuth = require('./settings');

const fs = require('fs');

const codes = JSON.parse(fs.readFileSync('./data/codes.json'));
const errorCode = codes.errors;

module.exports = function(passport, models) {

    const localUser = models.user_account;
    const progress = models.progress;
    const levelProgress = models.levelProgress;
    const activityProgress = models.activityProgress;
    let fname, lname;

    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(user, done) {
        done(null, user);
    });

    // Pass Google authentication configuration details
    passport.use(new GoogleStrategy({
        clientID: configAuth.googleAuth.clientID,
        clientSecret: configAuth.googleAuth.clientSecret,
        callbackURL: configAuth.googleAuth.callbackURL,
        access_type: configAuth.googleAuth.access_type
    },
    /**
     * Handle Google login using passport package
     * @param  {Object}   req          Request object
     * @param  {String}   accessToken  Google access token
     * @param  {String}   refreshToken Google refresh token
     * @param  {Object}   profile      Google profile data
     * @param  {Function} done         Callback function
     */
    function(req, accessToken, refreshToken, profile, done) {
        process.nextTick(function() {
            const nameArr = profile.displayName.split(' ');
            if (nameArr.length >= 2) {
                fname = nameArr[0];
                lname = nameArr[nameArr.length - 1];
            } else {
                fname = profile.displayName;
                lname = '';
            }
            localUser.findOrCreate({where: {
                email: profile.emails[0].value,
                provider: 'google'
            }, defaults: {
                email: profile.emails[0].value,
                provider: 'google',
                google_token: accessToken,
                google_id: profile.id,
                fname: fname,
                lname: lname
            }})
                .spread((user, created) => {
                    if (!created && !user) {
                        return done(null, false, {info: errorCode.PCE010.message, code: errorCode.PCE010.code});
                    }
                    progress.findOrCreate({where: {
                        user_id: user.id
                    }, defaults: {
                        user_id: user.id,
                        stage: 0,
                        activity: 0
                    }}).spread(() => {
                        const response = {email: user.email, name: user.name};
                        return done(null, response);
                    }).catch(function(err) {
                        return done(err);
                    });
                    levelProgress.findOrCreate({where: {
                        user_id: user.id
                    }, defaults: {
                        user_id: user.id,
                    }}).spread(() => {
                        const response = {email: user.email, name: user.name};
                        return done(null, response);
                    }).catch(function(err) {
                        return done(err);
                    });
                    activityProgress.findOrCreate({where: {
                        user_id: user.id
                    }, defaults: {
                        user_id: user.id,
                    }}).spread(() => {
                        const response = {email: user.email, name: user.name};
                        return done(null, response);
                    }).catch(function(err) {
                        return done(err);
                    });
                }).catch(function(err) {
                    return done(err);
                });
        });
    }));
    passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    /**
     * Handle local login
     * @param  {Object}   req      Request object
     * @param  {String}   email    User email
     * @param  {String}   password User password
     * @param  {Function} done     Callback function
     */
    function(req, email, password, done) {
        process.nextTick(function() {
            localUser.find({where: {
                email: email
            }}, {raw: true})
                .then(data => {
                    if (!data) {
                        return done(null, false, {info: errorCode.PCE008.message, code: errorCode.PCE008.code});
                    }
                    if (data.provider === 'google') {
                        return done(null, false, {info: errorCode.PCE009.message, code: errorCode.PCE009.code});
                    }
                    if (!data.verificationStatus) {
                        return done(null, false, {info: errorCode.PCE031.message, code: errorCode.PCE031.code});
                    }
                    bcrypt.compare(password, data.password, function(err, response) {
                        if (response) {
                            const response = { email: data.email, name: data.name};
                            return done(null, response);
                        } else {
                            return done(null, false, {info: errorCode.PCE005.message, code: errorCode.PCE005.code});
                        }
                    });
                })
                .catch(function(err) {
                    return done(err);
                });
        });
    }));
}
