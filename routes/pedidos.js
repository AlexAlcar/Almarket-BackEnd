var router = require('express').Router()
var pedidosController = require('../controllers/pedidosController')

router.get('/search', function (req, res) {
  pedidosController.search(req, res)
})
router.get('/', function (req, res) {
  pedidosController.list(req, res)
})
router.get('/find=:id', function (req, res) {
  pedidosController.show(req, res)
})
router.get('/getByUser=:id', function (req, res) {
  console.log("entroooo");
  pedidosController.getByUser(req, res)
})
router.post('/', function (req, res) {
  pedidosController.create(req, res)
})
router.put('/:id', function (req, res) {
  pedidosController.update(req, res)
})
router.delete('/:id', function (req, res) {
  pedidosController.remove(req, res)
})
module.exports = router