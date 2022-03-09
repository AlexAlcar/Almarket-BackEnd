var router = require('express').Router()
var usuarios = require('./usuarios')
var impresores = require('./impresores')

router.use('/usuarios', usuarios)
router.use('/impresores', impresores)

router.get('/', function (req, res) {
  res.status(200).json({ message: 'Estás conectado a nuestra API' })
})

module.exports = router