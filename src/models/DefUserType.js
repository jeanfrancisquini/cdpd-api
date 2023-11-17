const Sequelize = require('sequelize');
const sequelize = require('../db.js');

const schema = 'dbo';

class DefUserType extends Sequelize.Model {}
DefUserType.init({
    id: Sequelize.INTEGER,
    descricao: Sequelize.STRING
}, {sequelize, modelName: 'def_tipo_usuario', schema});

sequelize.sync();
module.exports = DefUserType;