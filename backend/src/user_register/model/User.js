const Sequelize = require('sequelize');
const db =require('../database/database');

const User = db.define('USER', {
    user_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    created_date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    birth_date: {
        type: Sequelize.DATE
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
}, {
    timestamps: false,
    tableName: 'USER'
});

User.associate = function(model) {
    
    USER.hasMany(model.TRANSACTION, {
      foreignKey: 'id'
    });
  };


module.exports = User;