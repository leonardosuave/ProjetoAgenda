import validator from "validator"; //Para validar email.

export default class Contato {
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
        
        const checkNome = this.checkNomeContato();
        const checkContato = this.checkContatoValido()

        if(checkNome && checkContato) {
            this.form.submit()
        }
    }

    checkContatoValido() {

        const email = this.form.querySelector('.emailContato')
        const telefone = this.form.querySelector('.telefoneContato')

        if(this.validaEmail(email) || this.validaTel(telefone)){
            return true
        } else {
            this.criaErro(email, 'Cadastre um E-mail e/ou Telefone')
            this.criaErro(telefone, 'Cadastre um Telefone e/ou E-mail')
        };
    };

    checkNomeContato() {
        let valid = true;

        //Para retirar os erros acumulados.
        for(let errorText of this.form.querySelectorAll('.error-text')) {
            errorText.remove()
        };

        for(let campo of this.form.querySelectorAll('.form-contato')) {

            //check nome
            if(campo.classList.contains('nomeContato')) {
                if(!this.validaNome(campo)) valid = false;
            };

        };
        return valid;
    }

    validaEmail(campo) {
        let valid = true

        if(!validator.isEmail(campo.value)){
            valid = false;
        }
        return valid; 
    }

    validaTel(campo) {
        let valid = true;

        if(!campo.value) {
            valid = false
        };
        return valid
    }

    validaNome(campo) {
        let valid = true;

        if(campo.value.length < 3 || campo.value.length > 12) {
            this.criaErro(campo, 'Nome inválido.')
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