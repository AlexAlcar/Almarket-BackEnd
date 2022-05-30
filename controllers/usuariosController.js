var Usuarios = require("../models/Usuarios");
var Pedidos = require("../models/Pedidos");
module.exports = {
  // https://docs.mongodb.com/v3.0/reference/operator/query/text/

  //Búsqueda por KeyWord (GET)
  search: function (req, res) {
    console.log("get");
    var q = req.query.q;
    Usuarios.find({ $text: { $search: q } }, function (err, usuarios) {
      if (err) return res.status(500).json({ message: "Error en la búsqueda" });
      return res.json(usuarios);
    });
  },
  //todos los elementos de la lista (GET)
  list: function (req, res) {
    //console.log("get list");
    Usuarios.find(function (err, usuarios) {
      if (err) return res.status(500).json({ message: "Error obteniendo el usuario" });
      console.log(new Date().toLocaleString() + " Get User List");
      return res.json(usuarios);
    });
  },
  //Listado toda la info en base a un id (GET)
  show: function (req, res) {
    var id = req.params.id;
    console.log("get by id");
    Usuarios.findOne({ _id: id }, function (err, usuario) {
      if (err)
        return res.status(500).json({ message: "Se ha producido un error al obtener el usuario" });
      if (!usuario) return res.status(404).json({ message: "No tenemos este usuario" });
      console.log(new Date().toLocaleString() + " Get User Info");
      return res.json(usuario);
    });
  },
  //Devuelve un bool si un nombre de usuario existe
  checkUsername: function (req, res) {
    var us = req.params.usuario;

    Usuarios.findOne({ usuario: us }, function (err, usuario) {
      if (err)
        return res.status(500).json({ message: "Se ha producido un error al obtener el usuario" });
      if (!usuario) return res.json(false);
      console.log(new Date().toLocaleString() + " checkUserName");
      return res.json(true);
    });
  },
  //Listado de usuarios de perfil "usuario" (GET)
  getUsuarios: function (req, res) {
    console.log("getusuarios");
    Usuarios.find({ perfil: "usuario" }, function (err, usuario) {
      if (err)
        return res
          .status(500)
          .json({ message: "Se ha producido un error al obtener los usuarios" });
      if (!usuario) return res.status(404).json({ message: "No se han encontrado usuarios" });
      console.log(new Date().toLocaleString() + " GetUsuarios");
      return res.json(usuario);
    });
  },
  //Listado de usuarios de perfil "impresor" (GET)
  getImpresores: function (req, res) {
    Usuarios.find({ perfil: "impresor" }, function (err, usuario) {
      if (err)
        return res
          .status(500)
          .json({ message: "Se ha producido un error al obtener los impresores" });
      if (!usuario)
        return res.status(404).json({ message: "No se han encontrado usuarios impresores" });
      console.log(new Date().toLocaleString() + " GetImpresores");
      return res.json(usuario);
    });
  },
  //Insertar elemento en la BBDD (POST)
  create: function (req, res) {
    var usuario = new Usuarios(req.body);
    usuario.save(function (err, usuario) {
      if (err)
        return res.status(500).json({
          message: "Error al guardar el usuario",
          error: err,
        });
      console.log(new Date().toLocaleString() + " Crear Usuario");
      return res.status(201).json({
        message: "saved",
        _id: usuario._id,
      });
    });
  },
  //Valorar usuario (PUT)
  rateUser: function (req, res) {
    //req.usuario y req.valoracion
    console.log(new Date().toLocaleString().toLocaleString() + " RateUser");
    //Buscamos el pedido cuyo estado queremos actualizar:
    Pedidos.findByIdAndUpdate(req.body.pedido, { new: false }).then((nuevoPedido) => {
      nuevoPedido.estado = "cerrado";
      console.log("ID Pedido:", req.body.pedido);
      console.log("Pedido encontrado: ", nuevoPedido);
      nuevoPedido.save();
    });

    Usuarios.findOneAndUpdate(
      { usuario: req.params.usuario },
      { $inc: { valoraciones: 1, puntuacion: req.body.puntuacion } },
      { new: true }
    )
      .then((nuevoUsuario) => {
        nuevoUsuario
          .save()
          .then((saved) => res.json(nuevoUsuario))
          .catch((err) => res.status(422).json(err));
      })
      .catch((err) => res.status(422).json(err));
  },

  //Actualizar elemento en la BBDD (PUT)
  update: function (req, res) {
    console.log(new Date().toLocaleString().toLocaleString() + " Put: ", req.body);
    Usuarios.findOneAndUpdate({ _id: req.body.id }, req.body, { new: true })
      .then((nuevoUsuario) => {
        nuevoUsuario
          .save()
          .then((saved) => res.json(nuevoUsuario))
          .catch((err) => res.status(422).json(err));
      })
      .catch((err) => res.status(422).json(err));
  },

  //Borramos un elemento de la tabla en base a su ID. (DELETE)
  remove: async function (req, res) {
    var id = req.params.id;
    await Usuarios.findByIdAndRemove(id, function (err, usuario) {
      if (err) return res.json(500, { message: "No hemos encontrado la usuario" });
      return res.json(usuario);
    });
  },

  //Chequeamos si hay usuario con ese password
  login: function (req, res) {
    var body = req.body;
    Usuarios.findOne({ usuario: body.usuario }, function (err, usuario) {
      console.log(new Date().toLocaleString().toLocaleString() + " Login");
      if (!usuario) return res.json(false);
      if (err) return res.status(500).json(false);
      if (usuario.password == body.password) return res.json(usuario);
      else return res.json(false);
    });
  },

  
};
