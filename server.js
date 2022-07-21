require('dotenv').config(); //Var de ambinete.

//Para improtar o express para o projeto.
const express = require('express');
const app = express();

//Conexão e modelagem da base de dados.
const mongoose =require('mongoose');
mongoose.connect(process.env.CONNECTIONSTRING)
    .then(() => {
        console.log('Conectei a base de dados!')
        app.emit('pronto');//sinal emitido quando conectado.           
    })
    .catch(e => console.log(e));

const session = require('express-session');//Verificação por cookie.
const MongoStore = require('connect-mongo');//Session salva no banco de dados.
const flashMessages = require('connect-flash');//msg auto destrutiva.(funciona apenas com session)
const routes = require('./routes');//Importa routes.js
const path = require('path');//Caminhos
//const helmet = require('helmet');//Recomendado pelo Express (segurança)
const csrf = require('csurf');//csrfTokens (segurança)
const { middlewareGlobal, checkCSRFerror, csrfMiddleware } = require('./src/middlewares/middleware'); //require por atribuição via desestruturação, ja que middlewareGlobal é um objeto do exports.


//app.use(helmet());
//Tratamento req.body
app.use(express.urlencoded({ extended:true }));//Postar forms dentro da aplicação
app.use(express.json());//Inserir Json dentro da aplicação

//Caminho do conteúdo estático
app.use(express.static(path.resolve(__dirname, 'public')));//Acesso diretamente

//Configuração da session
const sessionOptions = session({
    secret: 'ninguem vai saber o que é',
    store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING}),
    resave: false,
    saveUninitialized: false,
    cookie: { //Tempo de duração da session
        maxAge: 1000 * 60 * 60 * 24 * 7, //Para 7 dias
        httpOnly: true
    }
});
app.use(sessionOptions); //Para express executar session
app.use(flashMessages());//Para express executar flash

//caminho e view engine (arquivos que renderizam na tela)
app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.use(csrf());
app.use(middlewareGlobal);//Toda rota passa no middleware.
app.use(checkCSRFerror);//Todas as rotas checa o CSRF
app.use(csrfMiddleware);
app.use(routes);//Para o express utilizar as rotas


//Maneira correta de iniciar banco de dados antes do servidor.
app.on('pronto', () => { //quando receber o sinal faz a escuta no servidor
    app.listen(3000, () => {
        console.log('Acessar http://localhost:3000')
        console.log()
        console.log('Servidor executando na porta 3000')
    });
});
