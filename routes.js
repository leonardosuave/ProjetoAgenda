const express = require('express');
const route = express.Router();

//Importa os controller das rotas
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const contatoController = require('./src/controllers/contatoController');
const agendaController = require('./src/controllers/agendaController')

const {loginRequired, loginRequiredAgenda} = require('./src/middlewares/middleware');

//Routes pag inicial.
route.get('/', homeController.index);

//Rotas de login
route.get('/login/index', loginController.index);
route.post('/login/register', loginController.register);
route.post('/login/login', loginController.login)
route.get('/login/logout', loginController.logout)

//Routes de contato
route.get('/contato/index', loginRequired, contatoController.index);
route.post('/contato/register', loginRequired, contatoController.register);
route.get('/contato/index/:id', loginRequired, contatoController.editIndex); //Utilizado para recarregar dados de contatos para edição.
route.post('/contato/edit/:id', loginRequired, contatoController.editContato);
route.get('/contato/delete/:id', loginRequired, contatoController.delete)

//Route da agenda final
route.get('/agenda/index', loginRequiredAgenda, agendaController.index);


//Exportar as route para o server.js.
module.exports = route;