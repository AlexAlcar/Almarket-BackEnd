const text = require("body-parser/lib/types/text");
var Pedidos = require("../models/Pedidos");
const Usuario = require("../models/Usuarios");

module.exports = {
  // https://docs.mongodb.com/v3.0/reference/operator/query/text/

  //Búsqueda por KeyWord (GET)
  search: function (req, res) {
    var q = req.query.q;
    Pedidos.find({ $text: { $search: q } }, function (err, pedidos) {
      if (err) return res.status(500).json({ message: "Error en la búsqueda" });
      console.log(new Date().toLocaleString() + " Búsqueda por KeyWord");
      return res.json(pedidos);
    }).sort({_id : -1});
  },

  //todos los elementos de la lista (GET)
  list: function (req, res) {
    Pedidos.find(function (err, pedidos) {
      if (err) return res.status(500).json({ message: "Error obteniendo el pedido" });
      console.log(new Date().toLocaleString() + " Get Todos los elementos");
      return res.json(pedidos);
    });
  },

  //todos los pedidos de un usuario (GET)
  getByUser: function (req, res) {
    var id = req.params.id;
    Pedidos.find({ id_usuario: id }, function (err, usuario) {
      if (err)
        return res
          .status(500)
          .json({ message: "Se ha producido un error al obtener los usuarios" });
      console.log(new Date().toLocaleString() + " GetByUser");
      if (!usuario) return res.json(false);
      if (usuario.length <= 0) return res.json(false);
      return res.json(usuario);
    });
  },

  //todos los pedidos de un impresor (GET)
  getByPrinter: function (req, res) {
    var id = req.params.id;
    Pedidos.find({ id_impresor: id }, function (err, usuario) {
      if (err)
        return res
          .status(500)
          .json({ message: "Se ha producido un error al obtener los usuarios" });
      console.log(new Date().toLocaleString() + " getByPrinter");
      if (!usuario) return res.json(false);
      if (usuario.length <= 0) return res.json(false);
      return res.json(usuario);
    });
  },

  //Listado toda la info en base a un id (GET)
  show: function (req, res) {
    var id = req.params.id;
    console.log("consulta por id");
    Pedidos.findOne({ _id: id }, function (err, pedido) {
      if (err)
        return res.status(500).json({ message: "Se ha producido un error al obtener el pedido" });
      if (!pedido) return res.status(404).json({ message: "No tenemos este pedido" });
      console.log(new Date().toLocaleString() + " GetById");
      return res.json(pedido);
    });
  },

  //Insertar elemento en la BBDD (POST)
  create: function (req, res) {
    var pedido = new Pedidos(req.body);
    pedido.save(function (err, pedido) {
      if (err)
        return res.status(500).json({
          message: "Error al guardar el pedido",
          error: err,
        });
      console.log(new Date().toLocaleString() + " Creación Pedido");
      return res.status(201).json({
        message: "saved",
        _id: pedido._id,
      });
    });
  },

  //Actualizar elemento en la BBDD (PUT)
  update: function (req, res) {
    console.log("ID recibido x parametro: " + req.params.id);
    Pedidos.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
      .then((nuevoPedido) => {
        nuevoPedido
          .save()
          .then((saved) => res.json(nuevoPedido))
          .catch((err) => res.status(422).json(err));
      })
      .catch((err) => res.status(422).json(err));
    //console.log(new Date().toLocaleString() + " Actualizar Pedido nº:"+ req.params.id);
  },

  //Borramos un elemento de la tabla en base a su ID. (DELETE)
  remove: async function (req, res) {
    var id = req.params.id;
    await Pedidos.findByIdAndRemove(id, function (err, pedido) {
      if (err) return res.json(500, { message: "No hemos encontrado la pedido" });
      console.log(new Date().toLocaleString() + " Borrar Pedido");
      return res.json(pedido);
    });
  },

  subirSTL: function (req, res) {
    //console.log(req.file.filename);
    console.log(new Date().toLocaleString() + " subirSTL Filename: " + req.file.filename);
    return res.json({ filename: req.file.filename });
  },

  purge: function (req, res) {
    //purgado de archivos del servidor
    const fs = require('fs');
    const fs2 = require('fs').promises;
    const fileNames = [];
    fs.readdirSync('./uploads/').forEach(file => fileNames.push(file));
    //console.log(fileNames);
    Pedidos.find(function (err, pedidos) {
      if (err) return res.status(500).json({ message: "Error obteniendo el pedido" });
      console.log(new Date().toLocaleString() + " Purge");

      //Tengo que borrar de Filenames los archivos que NO esten en listaFicheros
      let ficherosPedidos = pedidos.map((e) => e.fichero);

      var intersection = fileNames.filter(function (e) {
        return ficherosPedidos.indexOf(e) == -1;
      });

      Promise.all(intersection.map(file => fs2.unlink(".//uploads//" + file)))
        .then(() => console.log("Purgado realizado con éxito"))
        .catch(err => console.log(err));

      return res.json("Purgado realizado correctamente");
    });
  },

//tarea de purgado llamada por un setInterval
  autoPurge: function (req, res) {
    const fs = require('fs');
    const fs2 = require('fs').promises;
    const fileNames = [];
    fs.readdirSync('./uploads/').forEach(file => fileNames.push(file));
    Pedidos.find(function (err, pedidos) {
      if (err) return res.status(500).json({ message: "Error obteniendo el pedido" });
      console.log(new Date().toLocaleString() + " Purge");
      let ficherosPedidos = pedidos.map((e) => e.fichero);
      var intersection = fileNames.filter(function (e) {
        return ficherosPedidos.indexOf(e) == -1;
      });
      Promise.all(intersection.map(file => fs2.unlink(".//uploads//" + file)))
        .then(() => console.log("Purgado realizado con éxito"))
        .catch(err => console.log(err));
    });
  },


 /*mainModels: function (req, res) {
    const fs = require('fs');
    const fs2 = require('fs').promises;
    //const fs = require('fs');
    const fileNames = [];
    let file1, file2;

    fs.readdirSync('D:/Proyectos/almarket-frontend/mainModels').forEach(file => fileNames.push(file));
    fileNames.map(f=>fs2.unlink("D:/Proyectos/almarket-frontend/mainModels/" + f));

    Pedidos.find(function (err, pedidos) {
      
      file1= pedidos[0].fichero;
      file2=pedidos[1].fichero;
      fs.copyFile(`./uploads/${file1}`, `D:/Proyectos/almarket-frontend/mainModels/model1.stl`, (err) => {
        if (err) {
          console.log("Error Found:", err);
        }} )
      fs.copyFile(`./uploads/${file2}`, `D:/Proyectos/almarket-frontend/mainModels/model2.stl`,  (err) => {
        if (err) {
          console.log("Error Found:", err);
        }} )

        
  
        return res.json("Copiados modelos correctamente.");
    }).sort({_id : -1});


  },*/
};
