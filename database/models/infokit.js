module.exports = function(sequelize, Sequelize) {

    const infokit = sequelize.define('info_kit', {
        malaria_def: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        pc_policy: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        animation: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        do_dont: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        odd_one_out: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        match_meds: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        side_effects: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        doctor_info: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        stop_Breed: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        stride_Against: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    }, {
        tableName: 'info_kit'
    });
    return infokit;
}
