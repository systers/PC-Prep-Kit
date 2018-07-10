module.exports = function(sequelize, Sequelize) {
    // Define activity levelNumber progress table for activities where different levels are possible
    // value 0: no levelNumber completed
    // value 1: Level 1 completed
    // value 2: Level 2 completed
    // value 3: Level 3 completed
    const levels = sequelize.define('levelProgress', {
        picturePuzzle: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        dragAndDrop: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        oddOneOut: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        matchMeds: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        memoryGame: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        stopBreed: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        strideAgainst: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        moskitoAsasinato: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        user_id: {
            type: Sequelize.INTEGER,
            unique: true
        }
    }, {
        tableName: 'level_progress'
    });
    return levels;
};
