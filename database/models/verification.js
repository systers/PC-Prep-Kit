module.exports = function(sequelize, Sequelize) {
    // Define progress_status table
    const status = sequelize.define('verification', {
        verificationCode: {
            type: Sequelize.STRING
        },
        user_id: {
            type: Sequelize.INTEGER,
            unique: true
        }
    }, {
        tableName: 'verification'
    });
    return status;
}
