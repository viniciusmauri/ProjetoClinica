# Projeto Clinica

## Configurar o docker

- Criar um docker usando imagem do postgres para database,
  - lembrar de configurar o arquivo database.js com as informações usada na criação do docker.

  - Exemplo: docker run --name "NOME_DO_CONTAINER" -p 5432:5432 -d -t postgres:12
    - postgres:12 é a versão do postgres.

- Criar um docker para utilizar o redis
  - Exemplo: docker run --name "NOME_DO_CONTAINER" -p 6379:6379 -d -t redis:alpine
  (Por padrão o redis utiliza a porta 6379)

    - utilizei a versão alpine por ser mais leve e para o uso na aplicação seria o ideal.

- Criar um docker para utilizar o Mongo
  - Exemplo: docker run --name "NOME_DO_CONTAINER" -p 27017:27017 -d -t mongo:latest
   - para utilizar a ultima versão do docker mongo

Para obter versões do docker acessar o Docker Hub pelo link:(https://hub.docker.com/)

## Configurar Eslint, Prettier e EditorConfig

Usar as extensões:
 - Eslint
 - Prettier
 - EditorConfig

## Scripts

 - "dev": "nodemon src/server.js"
 - "dev:debug": "nodemon --inspect src/server.js"
 - "queue": "nodemon src/queue.js"

## Estamos o utilizando o YARN para gerir os modulos do Node

Para instalar os modulos use o yarn install ou somente yarn

ou se caso optar por utilizar o NPM é só usar npm install

## Banco de dados

Utilizei o postgres como banco de dados para gerenciar dados dos usuários e agendamentos.
Utilizei o mongo como banco de dados para armazenar as notificações.

## Gerenciamento de E-mails

Utilizei o nodemailer e o redis, para gerenciar o envio de e-mail, com método de fila de envio.

  ### Dev
  - Para o ambiente de teste utilizei o MailTrap para teste de envio de e-mail. As configurações deste, deve ser feitas no arquivo src/config/mail.js
    - As configs são:
      - user:
      - pass:

  - Estas estão disponíveis no seu profile do MailTrap

## Bibliotecas

## Dev:

- eslint
- eslint-config-airbnb-base
- eslint-config-prettier
- eslint-plugin-import
- eslint-plugin-prettier
- nodemon
- prettier
- sequelize-cli
- sucrase

## Prod:

- @sentry/node
- @sentry/tracing
- bcryptjs
- bee-queue
- date-fns
- express
- express-async-errors
- express-handlebars
- jsonwebtoken
- mongoose
- multer
- nodemailer
- nodemailer-express-handlebars
- pg
- sequelize
- youch
- yup

## Padrões de código

Usar os padrões que estão configurados nos seguintes arquivos:

- .eslintrc.js
- .prettierc
- .sequilizerc
- .editorconfig
  - criar um arquivo .env e usar o exemplo de configuração contida no arquivo .env.example

