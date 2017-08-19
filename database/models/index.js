const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const sequelize = new Sequelize('pcprepkit', 'pcprepkit', 'pcprepkit', {
    host: 'localhost',
    dialect: 'mysql',
    define: {
        timestamps: false // true by default
    }
});
const db = {};
fs.readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf('.') !== 0) && (file !== 'index.js') && (file.indexOf('~') === -1)
    })
    .forEach(function(file) {
        const model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(function(modelName) {
    if ('associate' in db[modelName]) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
