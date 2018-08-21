module.exports = function(sequelize, Sequelize) {
    // Define activity progress table for activities where dynamic score is applicable
    const status = sequelize.define('activityProgress', {
        dragAndDrop: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        oddOneOut: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        user_id: {
            type: Sequelize.INTEGER,
            unique: true
        }
    }, {
        tableName: 'activity_progress'
    });
    return status;
};
