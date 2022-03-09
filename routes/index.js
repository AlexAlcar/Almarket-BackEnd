var router = require('express').Router()
var usuarios = require('./usuarios')

router.use('/usuarios', usuarios)

router.get('/', function (req, res) {
  res.status(200).json({ message: 'Estás conectado a nuestra API' })
})

module.exports = router