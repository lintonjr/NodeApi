const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    return res.send({message: 'Tudo ok com metodo da get Raiz!'});
})

router.post('/', (req, res) => {
    return res.send({message: 'Tudo ok com metodo da post Raiz!'});
})

module.exports = router;