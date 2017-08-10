module.exports = function(sequelize, Sequelize) {
    // Define progress_status table
    const status = sequelize.define('progress', {
        stage: {
            type: Sequelize.INTEGER
        },
        activity: {
            type: Sequelize.INTEGER
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

