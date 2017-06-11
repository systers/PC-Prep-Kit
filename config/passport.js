const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const LocalStrategy = require('passport-local').Strategy;
const configAuth = require('./settings');

module.exports = function(passport, models) {

    const localUser = models.user_account;

    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(user, done) {
        done(null, user);
    });

    passport.use(new GoogleStrategy({
        clientID: configAuth.googleAuth.clientID,
        clientSecret: configAuth.googleAuth.clientSecret,
        callbackURL: configAuth.googleAuth.callbackURL,
        access_type: configAuth.googleAuth.access_type
    },
    function(req, accessToken, refreshToken, profile, done) {
        process.nextTick(function() {
            localUser.findOrCreate({where: {
                email: profile.emails[0].value,
                provider: 'google'
            }, defaults: {
                    email: profile.emails[0].value,
                    provider: 'google',
                    google_token: accessToken,
                    google_id: profile.id,
                    name: profile.displayName
                }})
                .spread((user, created) => {
                    if(!created && !user) {
                        return done(null, false, {info: 'User with that email already exists'});
                    }
                    const response = {email: user.email, name: user.name};
                    return done(null, response);
                })
                .catch(function(err) {
                    return done(err);
                });
        });
    }
    ));

    passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    function(req, email, password, done) {
        process.nextTick(function() {
            localUser.find({where: {
                email: email
            }}, {raw: true})
                .then(data => {
                    if(!data) {
                        return done(null, false, {info: 'Invalid email or password'});
                    }
                    if(data.provider==='google') {
                        return done(null, false, {info: 'Please login with Google'});
                    }
                    if(data.password!==password) {
                        return done(null, false, {info: 'Invalid password'});
                    }
                    const response = { email: data.email, name: data.name};
                    return done(null, response);
                })
                .catch(function(err) {
                    return done(err);
                });
        });
    }
    ));
}
