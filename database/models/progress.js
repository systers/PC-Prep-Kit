module.exports = function(sequelize, Sequelize) {
    // Define progress_status table
    const status = sequelize.define('progress', {
        stage: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        activity: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        badge: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        score: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        user_id: {
            type: Sequelize.INTEGER,
            unique: true
        }
    }, {
        tableName: 'progress_status'
    });
    return status;
}
