exports.middlewareGlobal = (req, res, next) => {
    //Para capturar as msg de errors e success
    //As locals ficam disponivel globalmente
    res.locals.errors = req.flash('errors')
    res.locals.success = req.flash('success')
    res.locals.user = req.session.user //locals (user) recebe o objeto com os dados cadastrados (Utilizado para mostrar botao de login ou sair)
    next()
};

//Se tiver erro para aqui. Não chama o proximo Middleware(Sempre com 4 argumentos)
exports.checkCSRFerror = (err, req, res, next) =>{
    if(err) {//err significa se conter qualquer tipo de erro.
        return res.render('404')//Abrir a pagina 404
        
        //return res.send('ERRO 404') Para escrever essa msg
    }

    next()
};

//Para criar um csrfToken em todas as páginas e poder criar formúlarios  
exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken(),
    next()
}

//Para checar se existe o user cadastrado na session (logado)
exports.loginRequired = (req, res, next) => {
    if(!req.session.user) {
      req.flash('errors', 'Você precisa fazer login.');
      req.session.save(() => res.redirect('/login/index'));
      return;
    }
    next();
};

//Msg de login necessário especifico para acessar AGENDA.
exports.loginRequiredAgenda = (req, res, next) => {
    if(!req.session.user) {
      req.flash('errors', 'Para acessar sua agenda faça o login.');
      req.session.save(() => res.redirect('/login/index'));
      return;
    }
    next();
};

//Posso passar mais de um middleware aqui por exports.xxx
//Em server.js fazer require por associação via desestruturação tudo na mesma chave do exemplo, e depois atribuir o uso do express separadamente para cada middle desestruturado.