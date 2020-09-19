const { Model } = require("sequelize");
const Sequelize = require("sequelize");
const connection = require("./database");

// Criando uma TABELA
const Pergunta = connection.define('perguntas',{
    titulo:{
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao:{
        type: Sequelize.TEXT,
        allowNull: false
    }
});

// Se tabela já existe não será criada outra
Pergunta.sync({force: false})
        .then(() => {
            console.log("Tabela criada com sucesso!");
        });

module.exports = Pergunta;