# kukacBack
Back-End do Teste Técnico para Trainee Fullstack da Kukac

Foram utilizada as bibliotecas Express, Cors, Knex, Jest, dotenv

# Endpoints e suas instruções de uso
## Exercício 1: 
### /challenge/palindromos

 - Deve inserir via body dois números para verificar os palindromos entre eles.
 - Retorna todos os palindromos entre os dois números.


## Exercício 2: 
### /challenge/troco-caixa

- Deve inserir via body dois números, o valor da compra e o dinheiro do Usuário.
- Retorna o valor da compra, o valor do troco e a quantidade de cada nota do troco.


## Exercício 3: 
### /challenge/veiculos/inserir

- Deve inserir via body as informações do veículo para serem colocadas no arquivo .json.


### /challenge/veiculos/mostrar

- Retorna todos os veículos registrados no arquivo .json.

## Exercício 4:
### /challenge/confere-cep

- Deve inserir via body todos os 5 ceps dentro de um array.
- Retorna após requisição da viaCEP todos os endereços.

# Documentação do Postman

https://documenter.getpostman.com/view/17588262/UVypxwep

# Testes

- Os Testes foram feitos com Jest. Ele verifica todas as regras criadas na camada Business das requisições.
- Apenas rodar o script test para executar o mesmo. 
