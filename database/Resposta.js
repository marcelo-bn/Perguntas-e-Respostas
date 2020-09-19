const Sequelize = require("sequelize");
const connection = require("./database");

// Criando uma TABELA
const Resposta = connection.define('respostas',{
    corpo:{
        type: Sequelize.TEXT,
        allowNull: false
    },
    perguntaId:{
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

// Se tabela já existe não será criada outra
Resposta.sync({force: false})
        .then(() => {
            console.log("Tabela criada com sucesso!");
        });

module.exports = Resposta;