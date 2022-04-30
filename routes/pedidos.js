var router = require('express').Router()
const multer = require('multer');
const uuid = require('uuid');

const storage = multer.diskStorage({
  destination: 'uploads/', 
  filename: function(req, file, cb){
    const name = `${uuid.v4()}.stl`;
    cb("",name);
    return name;
  }
});

const upload=multer({
  storage:storage
});

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
  pedidosController.getByUser(req, res)
})
router.get('/getByPrinter=:id', function (req, res) {
  pedidosController.getByPrinter(req, res)
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


router.post('/subirSTL',upload.single('stl'), function (req, res, next) {
  
  
  pedidosController.subirSTL(req, res);
})

module.exports = router