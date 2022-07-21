const mongoose = require('mongoose');

//Criação do esquema.
const HomeSchema = new mongoose.Schema({ //Objeto com configuração dos dados do objeto.
    titulo: {type: String, require:true},
    descricao: String
})

//Criação do Model
const HomeModel = mongoose.model('Home', HomeSchema);

class Home {

}

module.exports = Home