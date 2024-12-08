# AutoRent - Sistema de Aluguel de Carros

Este é um sistema completo para aluguel de carros, desenvolvido com as seguintes tecnologias:

- **Backend:** Node.js, Express.js, Sequelize, MySQL
- **Frontend:** React, React Router
- **Banco de Dados:** MySQL
- **Outras ferramentas:** Postman para testes de API

## Funcionalidades

- **Autenticação de Usuário**: Login e Cadastro.
- **Gestão de Reservas**: Criar, listar, confirmar e cancelar reservas.
- **Gerenciamento de Carros**: Exibir carros disponíveis para aluguel.
- **Cálculo Automático de Preços**: Baseado na quantidade de dias da reserva.
- **Interface de Administração de Carros**: Uma interface amigável para o gerenciamento de carros, incluindo edição e criação de novos carros.

---

## Configuração do Projeto

### Pré-requisitos
- **Node.js**: v16 ou superior
- **MySQL**: Banco de dados configurado

### 1. Configuração do Backend

1. Clone o repositório:
   ```bash
   git clone git@github.com:vngoliveira/AutoRent.git
   cd AutoRent
2. Instale as dependências:
   ```bash
    cd car-rental-api
    npm install
4. Configure o banco de dados no arquivo .env:
   ```bash
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=senha
   DB_NAME=car_rental
   DB_PORT=3306
   DB_DIALECT=mysql
5. Execute as migrações do banco de dados:
   ```bash
   npx sequelize db:migrate
6. Inicie o servidor:
   ```bash
   node app.js

### 2. Configuração do Frontend
1. Instale as dependências:
   ```bash
   cd car-rental-web
   npm install
2. Inicie o servidor de desenvolvimento:
   ```bash
   npm start

### Endpoints da API
#### Carros
- GET /api/cars: Lista todos os carros.
- GET /api/cars/:id: Detalhes de um carro.
- POST /api/cars: Criação de um carro (apenas para admin).
- PUT /api/cars/:id: Atualizar um carro (apenas para admin).
- DELETE /api/cars/:id: Deletar um carro (apenas para admin).
#### Reservas
- POST /api/reservations: Criar uma reserva.
- GET /api/reservations/:id: Detalhes de uma reserva.
- PUT /api/reservations/:id/cancel: Cancelar uma reserva.
