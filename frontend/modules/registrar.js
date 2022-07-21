import validator from "validator"; //Para validar email.

export default class Registrar {
    constructor(formClass) {
        this.form = document.querySelector(formClass);
    }

    init() {
        this.events();
    }

    events() {
        if(!this.form) return;
        this.form.addEventListener('submit', e => {
            this.handleSubmit(e)
        });
    };

    handleSubmit(e) {
        e.preventDefault();
        
        const checkCamposValidos = this.checkCamposValidos();

        if(checkCamposValidos) {
            this.form.submit()
        }
    }

    checkCamposValidos() {
        let valid = true;

        //Para retirar os erros acumulados.
        for(let errorText of this.form.querySelectorAll('.error-text')) {
            errorText.remove()
        };

        for(let campo of this.form.querySelectorAll('.form-registrar')) {

            //check email
            if(campo.classList.contains('emailRegister')) {
                if(!this.validaEmail(campo)) valid = false
            };

            //check nome
            if(campo.classList.contains('nomeRegister')) {
                if(!this.validaNome(campo)) valid = false;
            };

            //check sobrenome
            if(campo.classList.contains('sobrenomeRegister')) {
                if(!this.validaSobrenome(campo)) valid = false;
            }

            //check senha
            if(campo.classList.contains('senhaRegister')) {
                if(!this.validaSenha(campo)) valid = false;
            }
        }

        return valid;
    }

    validaEmail(campo) {
        let valid = true

        if(!validator.isEmail(campo.value)){
            this.criaErro(campo, 'E-mail inválido!')
            valid = false;
        }
        return valid; 
    }

    validaNome(campo) {
        let valid = true;

        if(campo.value.length < 3 || campo.value.length > 12) {
            this.criaErro(campo, 'Nome deve ter entre 3 e 12 letras.')
            valid = false;
        }
        return valid; 
    }

    validaSobrenome(campo) {
        let valid = true;

        if(campo.value.length < 3) {
            this.criaErro(campo, 'Sobrenome deve ter pelomenos 3 letras.');
            valid = false;
        }
        return valid;
    }

    validaSenha(campo) {
        let valid = true;

        if(campo.value.length < 5 || campo.value.length > 12) {
            this.criaErro(campo, 'Senha deve ter entre 5 e 12 caracteres.')
            valid = false;
        }
        return valid;
    }

    criaErro(campo, msg) {
        const div = document.createElement('div');
        div.innerHTML = msg;
        div.classList.add('error-text')
        campo.insertAdjacentElement('afterend', div)
    }
};

/*
validate(e) {
    const elemento = e.target;
    const emaiImput = elemento.querySelector('.emailRegister');
    const nomeImput = elemento.querySelector('.nomeRegister');
    const sobrenomeImput = elemento.querySelector('.sobrenomeRegister') ;
    const senhaImput = elemento.querySelector('.senhaRegister');

    //Flag de erro.
    let error = false

    //Checar validação dos campos de registro.
    if(!validator.isEmail(emaiImput.value)){
        alert('Email inválido.')
        error = true;
    }
    if(nomeImput.value.length < 3) {
        alert('Nome deve ter acima de 3 letras.');
        error = true;
    } 
    if(sobrenomeImput.value.length < 3) {
        alert('Sobrenome deve ter acima de 3letras.')
        error = true;
    }
    if(senhaImput.value.length < 5 || senhaImput.value.length > 12) {
        alert('Senha deve ter entre 5 e 12 caracteres.')
        error = true;
    }

    if(!error) elemento.submit()
}
*/