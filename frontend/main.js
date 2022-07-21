import 'core-js/stable';
import 'regenerator-runtime/runtime';

import './assets/css/style.css'

import Registrar from './modules/registrar';
import Login from './modules/login';
import Contato from './modules/contato';

const registrar = new Registrar('.form-registrar');
registrar.init();

const login = new Login('.form-login');
login.init();

const contatoReg = new Contato('.form-contatoRg');
contatoReg.init();
const contatoEdit = new Contato('.form-contatoEd');
contatoEdit.init();



