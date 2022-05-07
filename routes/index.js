var router = require("express").Router();
var usuarios = require("./usuarios");
var pedidos = require("./pedidos");

router.use("/usuarios", usuarios);
router.use("/pedidos", pedidos);

router.get("/", function (req, res) {
  res.status(200).json({ message: "Estás conectado a nuestra API" });
});

module.exports = router;
