var router = require('express').Router()
var impresoresController = require('../controllers/impresoresController')

router.get('/search', function (req, res) {
  impresoresController.search(req, res)
})
router.get('/', function (req, res) {
  impresoresController.list(req, res)
})
router.get('/:id', function (req, res) {
  impresoresController.show(req, res)
})
router.post('/', function (req, res) {
  impresoresController.create(req, res)
})
router.put('/:id', function (req, res) {
  impresoresController.update(req, res)
})
router.delete('/:id', function (req, res) {
  impresoresController.remove(req, res)
})
router.post('/login', function (req, res) {
  impresoresController.login(req, res)
})
module.exports = router