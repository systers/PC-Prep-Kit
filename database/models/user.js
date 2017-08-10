module.exports = function(sequelize, Sequelize) {
    // Define user_accounts table
    const User = sequelize.define('user_account', {
        fname: {
            type: Sequelize.STRING
        },
        lname: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING,
            unique: true
        },
        password: {
            type: Sequelize.STRING
        },
        verificationCode: {
            type: Sequelize.STRING
        },
        verificationStatus: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        resetPasswordToken: {
            type: Sequelize.STRING
        },
        resetPasswordExpires: {
            type: Sequelize.DATE
        },
        provider: {
            type: Sequelize.ENUM,
            values: ['local', 'google']
        },
        google_id: {
            type: Sequelize.STRING
        },
        google_token: {
            type: Sequelize.STRING
        }
    });
    return User;
}
