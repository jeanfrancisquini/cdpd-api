const Sequelize = require('sequelize')
const sequelize = new Sequelize('cdpd-database', 'admin', 'x5Cjy4fPe5IL5fh', {
    host: 'cdpd-db.c1qhsihaqmhn.us-east-2.rds.amazonaws.com',
    dialect: 'mssql'
});

module.exports = sequelize;