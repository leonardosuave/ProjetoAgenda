const Contato = require('../models/ContatoModel')

exports.index = (req, res) => {
    res.render('contato', {contatoBanco: {}}); //{contatoBanco} é enviado porque atribuiu contatoBanco.nome... no forms de cadastro de contatos para quando quiser editar ja apareça os valores ja cadastrados nos campos (1° vez vai em branco)
};

exports.register = async (req, res) => {
    try {
        const contato = new Contato(req.body) //Aqui retorna contato = {this.body = body} que contem os dados dos campos enviados
        await contato.register()
        
        if(contato.errors.length > 0) {
            req.flash('errors', contato.errors);//Envia os erros em flash
            req.session.save(function() { //Para salvar a seção e retornar com callback a pagina de login 
                return res.redirect('/contato/index'); //Vai redirecionar para a pagina de cadastro de contato.
            }) 
            return;   
        }

        //Para contato registrado com sucesso.
        req.flash('success', 'Contato registrado!')
        req.session.save(function () {
            return res.redirect(`/agenda/index`) // -> Após registrar o contato é redirecionado para a tela inicial da agenda
            
            //res.redirect(`/contato/index/${contato.contato._id}`)
            //Vai redirecionar para a edição do contato cadastrado.
            //contato.contato equivale ao this.contato que recebeu o registro
            //OBS: --> contato.contato retorna o this.contato com os campos ja tratados(nome,sobr,email,tel,data e id do banco de dados.)
        })

    } catch(e) {
        console.log(e)
        return res.render('404')
    }
}

//Para salvar os dados do contato nos campos para edição.
exports.editIndex = async(req, res) => {
    if(!req.params.id) return res.render('404'); //Caso não receba o id do contato cadastrado

    //Aqui não precisa instânciar, pode atribuir await Contato.buscaPorId direto , ja que é uma constructor function e não class
    const contatoBanco = await Contato.buscaPorId(req.params.id) 
    if(!contatoBanco) return res.render('404');
    res.render('contato', {contatoBanco}); //o destructor de {contatoBanco} contem o usuario referente ao req.params.id buscado na base de dados e é utilizado para atribuir os valores nos campos dos cadastros que vão ser editados
}

exports.editContato = async (req, res) => {
    if(!req.params.id) return res.render('404'); //Caso não receba o id do contato cadastrado.
    
    try {
        const contato = new Contato(req.body)
        //Com a página recarregada com os valores do contato através do editIndex, caso tenha modificações no campo sera novamente enviado o req.body para a structor function e feito as devidas validações dos dados. 

        await contato.edit(req.params.id)
        //Envia o id do contato que quer atualizar para salvar com os novos dados no banco de dados. 

        if(contato.errors.length > 0) {
            req.flash('errors', contato.errors);//Envia os erros em flash
            req.session.save(function() { //Para salvar a seção e retornar com callback a pagina de login             
                return res.redirect(`/contato/index/${req.params.id}`); //Vai redirecionar para a pagina de cadastro de contato.
        }) 
        return;   
        }

        //Para contato editado com sucesso.
        req.flash('success', 'Contato editado com sucesso!')
        req.session.save(function () {
            return res.redirect(`/agenda/index`)// ->Redireciona para a tela inicial da agenda.

            //res.redirect(`/contato/index/${contato.contato._id}`)  
            //Vai redirecionar para a edição do contato cadastrado.
            //contato.contato equivale ao this.contato que recebeu o registro
        });

    } catch(e) {
        console.log(e)
        return res.render('404')
    }
}

exports.delete = async function(req, res) {
    if(!req.params.id) return res.render('404'); //Caso não receba o id do contato cadastrado

    //Aqui não precisa instânciar, pode atribuir await Contato.buscaPorId direto , ja que é uma constructor function e não class
    const contatoDel = await Contato.delete(req.params.id) //Retorna os dados do contato que foi apagado.
    if(!contatoDel) return res.render('404');

    req.flash('success', 'Contato apagado com sucesso.')
    req.session.save(() => {
        return res.redirect(`/agenda/index`)
    });    
    
}