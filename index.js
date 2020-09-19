const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Pergunta = require("./database/Pergunta");
const Resposta = require("./database/Resposta");

// Conectando ao Banco de Dados
connection
    .authenticate()
    .then(() => {
        console.log("Banco de dados conectado!");
    })
    .catch((err) => {
        console.log("Erro ao tentar se conectar com o Banco de Dados!");
    })

// Definindo EJS como renderizador de HTML
app.set('view engine','ejs');

// Arquivos estáticos
app.use(express.static('public'));

// Linkando body-parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Rota principal
app.get("/",function(req,res){
    
    // SELECT * FROM perguntas
    Pergunta.findAll({ raw: true, order: [['id','DESC']]})
            .then(perguntas => {
                res.render("index",{
                    perguntas: perguntas
                });
            });

});

// Rota para realizar pergunta
app.get("/perguntar",(req,res) => {
    res.render("perguntar");
});

// Recebendo dados do formulário
app.post("/salvarpergunta",(req,res) => {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    
    // INSERT INTO 
    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect("/");
    });

});

// Página da pergunta
app.get("/pergunta/:id",(req,res) => {
    var id = req.params.id;

    Pergunta.findOne({
        where: {id: id}
    }).then(pergunta => {
        if(pergunta != undefined) {

            Resposta.findAll({
                where: {perguntaId : pergunta.id},
                order: [['id','DESC']]
            }).then(respostas => {
                res.render("pergunta",{
                    pergunta: pergunta,
                    respostas: respostas
                });
            });
        } else {
            res.redirect("/");
        }
    });
});

// Rota para responder
app.post("/responder",(req,res) => {
    var corpo = req.body.corpo;
    var perguntaId = req.body.pergunta;

    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() => {
        res.redirect("/pergunta/"+perguntaId);
    });
});

// Iniciando servidor
app.listen(8080,function(erro){
    if(erro) {
        console.log("Ocorreu algum erro!");
    } else {
        console.log("Servidor ativo!");
    }
});