const Sequelize = require('sequelize');
const database = new Sequelize('abc-db', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    logging:false
});


module.exports = database;