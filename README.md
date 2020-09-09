# Projeto Clinica

## Configurar o docker

Criar um docker usando imagem do postgres para database,
- lembrar de configurar o arquivo database.js com as informações usada na criação do docker.

## Configurar Eslint, Prettier e EditorConfig

Usar as extensões:
 - Eslint
 - Prettier
 - EditorConfig

## Scripts

 - "dev": "nodemon src/server.js"
 - "dev:debug": "nodemon --inspect src/server.js"

## Estamos o utilizando o YARN para gerir os modulos do Node

Para instalar os modulos use o yarn install ou somente yarn

ou se caso optar por utilizar o NPM é só usar npm install

## Banco de dados

Utilizei o postgres como Banco de Dados.

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

- Sequelize
- pg
- express
- yup
- jsonwebtoken
- bcryptjs

## Padrões de código

Usar os padrões que estão configurados nos seguintes arquivos:

- .eslintrc.js
- .prettierc
- .sequilizerc
- .editorconfig

