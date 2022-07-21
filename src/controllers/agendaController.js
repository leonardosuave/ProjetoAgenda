const Contato = require('../models/ContatoModel');

//Ficou async para capturar os contatos do banco de dados para a home.
exports.index = async(req, res) => {
    const contatos = await Contato.buscaContato();
    res.render('agenda', { contatos });  //{contatos} Envia todos os contatos do banco de dados para carregar na pagina index(home)
}

