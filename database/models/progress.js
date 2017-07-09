module.exports = function(sequelize, Sequelize) {

    const status = sequelize.define('progress', {
        stage: {
            type: Sequelize.INTEGER
        },
        activity: {
            type: Sequelize.INTEGER
        }
    }, {
        tableName: 'progress_status'
    });
    return status;
}

