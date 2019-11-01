const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//Conexão e configuração com banco de dados
const url = 'mongodb+srv://lintonjr:huntersoul@clusterapi-cxyqj.mongodb.net/test?retryWrites=true&w=majority';
const options = { reconnectTries: Number.MAX_VALUE, recoonectInterval: 500, poolSize: 5, useNewUrlParser: true };

//inicialização do mongoose com tratamento de erro on error e disconnected
mongoose.connect(url, options);
mongoose.set('useCreateIndex', true);

mongoose.connection.on('error', (err) => {
    console.log('Erro na conexão com banco de dados ' + err);
})

mongoose.connection.on('disconnected', (err) => {
    console.log('Desconexão do banco por  ' + err);
})

mongoose.connection.on('connected', () => {
    console.log('Conectado com sucesso!');
})

//body parser
app.use(bodyParser.urlencoded({ extended: false }));
//conversão das requisições em json.
app.use(bodyParser.json());

//Rotas
const indexRoute = require('./Routes/index');
const usersRoute = require('./Routes/users');

//uso das rotas
app.use('/', indexRoute);
app.use('/users', usersRoute);

app.listen(3000);

module.exports = app;