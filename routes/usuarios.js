var router = require("express").Router();
var usuariosController = require("../controllers/usuariosController");

router.get("/search", function (req, res) {
  usuariosController.search(req, res);
});
router.get("/", function (req, res) {
  usuariosController.list(req, res);
});
router.get("/find=:id", function (req, res) {
  usuariosController.show(req, res);
});
router.post("/", function (req, res) {
  usuariosController.create(req, res);
});
router.put("/rateUser=:usuario", function (req, res) {
  usuariosController.rateUser(req, res);
});
router.put("/:id", function (req, res) {
  usuariosController.update(req, res);
});
router.delete("/:id", function (req, res) {
  usuariosController.remove(req, res);
});
router.post("/login", function (req, res) {
  usuariosController.login(req, res);
});
router.get("/getUsuarios", function (req, res) {
  usuariosController.getUsuarios(req, res);
});
router.get("/getImpresores", function (req, res) {
  usuariosController.getImpresores(req, res);
});
router.get("/checkUsername=:usuario", function (req, res) {
  usuariosController.checkUsername(req, res);
});
module.exports = router;
