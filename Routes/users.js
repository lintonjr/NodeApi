const express = require('express');
const router = express.Router();
const Users = require('../model/user');
const bcrypt = require('bcrypt');

router.get('/', (req, res) => {
    Users.find({}, (err, data) => {
        if (err) return res.send({ error: 'Erro na consulta'});
        return res.send(data);
    })
})

// router.post('/', (req, res) => {
//     return res.send({message: 'Tudo ok com metodo post da Rota de usuários!'});
// })

router.post('/create', (req, res) => {
    // const obj = req.body;

    const { email, password } = req.body;

    if (!email || !password) return res.send({ error: 'Preencha e-mail e Senha'});

    Users.findOne({ email }, (err, data) => {
        if (err) return res.send({ error: 'Erro ao criar usuário.'});
        if (data) return res.send({ error: 'Usuário já existe.'});

        Users.create(req.body, (err, data) => {
            if (err) return res.send({ error: 'Erro ao criar usuário.'})

            data.password = undefined;
            return res.send(data);
        });
    });
});

router.post('/auth', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) return res.send({ error: 'Faltando email ou password.'});

    Users.findOne({email}, (err, data) => {
        if (err) return res.send({ error: 'Erro ao encontrar o usuário'})
        if (!data) return res.send({ error: 'Usuário inexistente.'});

        bcrypt.compare(password, data.password, (err, same) => {
            if(!same) return res.send({ error: 'Erro ao autenticar.'});
            
            data.password = undefined;
            return res.send(data);
        });
    }).select('+password');

});

module.exports = router;