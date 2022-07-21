const mongoose = require('mongoose');
const validator = require('validator')//Validar email.
const bcryptjs= require('bcryptjs')

//Criação do esquema.
const LoginSchema = new mongoose.Schema({ //Objeto com configuração dos dados do objeto.
    email: {type: String, require:true},
    nome: {type: String, require:true},
    sobrenome: {type: String, require:true},
    password: {type: String, require:true},
})

//Criação do Model
const LoginModel = mongoose.model('Login', LoginSchema);

class Login { //Para receber o req.body enviado no cadastro 
    constructor(body) {
        this.body = body,
        this.errors = [], //flag de erros
        this.user = null
    }

    //Para logar usuário
    async login() {
        this.validaLogin();//Necessário outro método valida() para checar apenas email e senha (não checa nome e sobrenome)
        if(this.errors.length > 0) return; 

        //Vai procurar o usuário
        this.user = await LoginModel.findOne({ email: this.body.email }); //Caso no final a senha foi igual, então atribui este usuário do banco de dados para this.user da Class Login

        if(!this.user) {
            this.errors.push('Usuário não existe.')
            return; 
        }

        //Se o usuário existir, então checa a senha. (this.user.password vem da checagem do email)
        if(!bcryptjs.compareSync(this.body.password, this.user.password)) {
            this.errors.push('Senha inválida.')
            this.user = null //Garante que o usuário seja null caso não o encontre para logar.
            return;
        }
    }

    //Operações de base de dados retornam promises.
    async register() {
        this.valida();//Método que valida os campos

        //Se o array errors for maior que 0, então possui erros de cadastro.
        if(this.errors.length > 0) return; 

        await this.userExists();

        //Para checar novamente se teve erro de usuário existente.
        if(this.errors.length > 0) return; 

        //Tratamento da senha para o banco de dados.
        const salt = bcryptjs.genSaltSync();
        this.body.password = bcryptjs.hashSync(this.body.password, salt) //Faz um hash com o valor da senha e o salt -> Vai criptografar

        //Para registrar o usuário caso esteja correto.
        //this.body ja esta limpo(só com email e senha)
        this.user = await LoginModel.create(this.body) //É criado dentro do this.user da Class Pessoa
    }

    //Vai me retornar promise, ja que é relacionado ao banco de dados.
    async userExists() {

        //Vai encontrar um registro da base de dados que tenha o email igual a this.body.email (retorna o usuário ou null)
        const checkUsuario = await LoginModel.findOne({ email: this.body.email })

        if(checkUsuario) this.errors.push('Usuário já existe.')//Se retornar um email.
    }

    valida() {
        this.cleanUp();
        //Validação

        //O e-mail precisa ser válido
        if(!validator.isEmail(this.body.email)) this.errors.push('E-mail inválido');

        //O nome e sebrenome precisam ter no min 3 letras.

        if(!this.body.nome) this.errors.push('Nome não pode estar em branco.');
        if(!this.body.sobrenome) this.errors.push('Sobrenome não pode estar em branco.');
        
        if(this.body.nome.length < 3) this.errors.push('Nome deve ter acima de 3 letras.')
        if(this.body.sobrenome.length < 3) this.errors.push('Sobrenome deve ter acima de 3 letras.')

        //A senha precisa ter entre 5 e 12 caracteres.
        if(this.body.password.length < 5 || this.body.password.length > 12) this.errors.push('Senha inválida. A senha precisa ter entre 5 e 12 caracteres.');
    }

    validaLogin() {
        this.cleanUp();
        //Validação

        //O e-mail precisa ser válido
        if(!validator.isEmail(this.body.email)) this.errors.push('E-mail inválido');

        //A senha precisa ter entre 5 e 12 caracteres.
        if(this.body.password.length < 5 || this.body.password.length > 12) this.errors.push('Senha inválida. A senha precisa ter entre 5 e 12 caracteres.');
    }

    //Verificar se tudo no body é STRING
    cleanUp() {
        for(const key in this.body) {
            if(typeof this.body[key] !== 'string') {
                this.body[key] = ''; //Se não for string, converte em string vazia.
            }
        }
       
        //Para garantir que so tenha email e senha neste campo e não o csrfToken.
        this.body = {
            email: this.body.email,
            nome: this.body.nome,
            sobrenome: this.body.sobrenome,
            password: this.body.password
        }
        
    }
}

module.exports = Login;