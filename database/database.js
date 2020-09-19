const Sequelize = require("sequelize");
const connection = new Sequelize('guiaperguntas','root','marcelomac',{
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = connection;