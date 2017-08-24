module.exports = {
    basePath: 'http://localhost:3000/',
    googleAuth: {
        clientID: '701417346516-33qb38qk06480vh9vg91btfletf6nlqr.apps.googleusercontent.com',
        clientSecret: '45rNBMN0HsoYJmsyxZ3qkHeC',
        callbackURL: 'http://localhost:3000/auth/google/callback',
        access_type: 'offline'
    },
    secretKey: 'pcprepkittokengenkey',
    nodeMailer: {
        PROVIDER: 'Gmail',
        EMAIL: 'pcprepkit@gmail.com',
        PASSWORD: 'pcprepkit9'
    },
    apiai: {
        clientToken: '2da698372070440e9ac9ac5c96917147'
    }

}
