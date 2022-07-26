# ProjetoAgenda
Neste projeto foi desenvolvido uma agenda em que é possível fazer o registro do usuário e posteriormente o cadastro dos contatos.  Para o design da página foi utilizado o Bootstrap e para o armazenamento dos dados de usuários e de contatos cadastrados foi utilizado o MongoDB; Para evitar processos de checagem de cadastros desnecessários foi realizado também a válidação no cliente do usuário (front-end) e se caso estiver em conformidade os dados inseridos na tela é redirecionado para a válidação no back-end e banco de dados.
 
Foi feito o deploy da aplicação através do Google Clound Platform

O funcionamento da aplicação pode ser acessado através do indereço de IP: http://35.247.197.95/

Para o funcionamento do projeto após o download dos aquivos se faz necessário vincular um login válido no mongoDB para armazenamento de seus dados cadastrais. Para isso, criar um arquivo .env na raiz do projeto, inserir CONNECTIONSTRING= login válido do mongoDB (usuário e senha ja inclusos no link de acesso).
