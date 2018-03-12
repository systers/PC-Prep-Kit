module.exports = {
  basePath: 'http://localhost:3000/',
  googleAuth: {
    clientID: '311448429695-va7g4f7takj7blpudu4gtvf9qeqr86a0.apps.googleusercontent.com',
    clientSecret: 'YG0pAqQwrR8Lsdyh89cFHg3x',
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
    clientToken: '0f67eb54f1d74ea4a3d9c34a76da68ca'
  },
  databaseSetup: {
    DATABASE_NAME: 'pcprepkit',
    USERNAME: 'root',
    PASSWORD: '96678239'
  }
}
