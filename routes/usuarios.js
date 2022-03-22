var router = require('express').Router()
var usuariosController = require('../controllers/usuariosController')

router.get('/search', function (req, res) {
  usuariosController.search(req, res)
})
router.get('/', function (req, res) {
  usuariosController.list(req, res)
})
router.get('/:id', function (req, res) {
  usuariosController.show(req, res)
})
router.post('/', function (req, res) {
  usuariosController.create(req, res)
})
router.put('/:id', function (req, res) {
  usuariosController.update(req, res)
})
router.delete('/:id', function (req, res) {
  usuariosController.remove(req, res)
})
router.post('/login', function (req, res) {
  usuariosController.login(req, res)
})
module.exports = router