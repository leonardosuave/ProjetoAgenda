const Login = require('../models/LoginModel')

//Controladora para abrir a pagina de login
exports.index = (req, res) => {
    if(req.session.user) return res.render('login-logado')
    res.render('login')
};

//Controladora para registrar usuários.
exports.register = async function(req, res) {
    try {
        //login = instância
        const login = new Login(req.body)
        await login.register();

        //Para mostrar os erros na página
        if(login.errors.length > 0) {
            req.flash('errors', login.errors);//Envia os erros em flash
            req.session.save(function() { //Para salvar a seção e retornar com callback a pagina de login 
                return res.redirect('/login/index');//Redireciona para a pagina anterior(login).
            });
            return;
        }

        //Para mostrar msg de success se tudo estiver correto.
        req.flash('success', 'Cadastro realizado com sucesso');
        req.session.save(function() { 
            return res.redirect('/login/index');
        });
    } catch(e) {
        console.log(e);
        return res.render('404');
    }
}

//Controladora para logar usuários.
exports.login = async function(req, res) {
    try {
        //login = instância
        const login = new Login(req.body)
        await login.login();

        //Para mostrar os erros na página
        if(login.errors.length > 0) {
            req.flash('errors', login.errors);//Envia os erros em flash
            req.session.save(function() { //Para salvar a seção e retornar com callback a pagina de login comn os erros.
                return res.redirect('/login/index');//Redireciona para a pagina anterior(login).
            });
        return;
        }

        //Para mostrar msg de success se tudo estiver correto.
        req.flash('success', 'Login realizado com sucesso.');
        req.session.user = login.user;//Cadastra o user na session (Quando efetua o login o user é cadastrado na session)
        req.session.save(function() { 
            return res.redirect('/login/index');
        });
    } catch(e) {
        console.log(e);
        return res.render('404');
    };
};

//Para deslogar o usuário
exports.logout = (req, res) => {
    //req.session.user = null
    req.session.destroy(); //Vai destruir a session e sair.
    return res.redirect('/login/index')
}