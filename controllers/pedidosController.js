var Pedidos = require('../models/Pedidos')
module.exports = {
    // https://docs.mongodb.com/v3.0/reference/operator/query/text/

    //Búsqueda por KeyWord (GET)
    search: function (req, res) {
        var q = req.query.q
        Pedidos.find({ $text: { $search: q } }, function (err, pedidos) {
            if (err) return res.status(500).json({ message: 'Error en la búsqueda' })
            return res.json(pedidos)
        })
    },

    //todos los elementos de la lista (GET)
    list: function (req, res) {
        Pedidos.find(function (err, pedidos) {
            if (err) return res.status(500).json({ message: 'Error obteniendo el pedido' })
            return res.json(pedidos)
        })
    },

        //todos los pedidos de un usuario (GET)
        getByUser: function (req, res) {
            var id = req.params.id
          Pedidos.find({ id_usuario : id }, function (err, usuario) {

              if (err) return res.status(500).json({ message: 'Se ha producido un error al obtener los usuarios' })
              if (!usuario) return res.json(false);
              if (usuario.length<=0)return res.json(false)
              return res.json(usuario)
          })
        },

    //Listado toda la info en base a un id (GET)
    show: function (req, res) {
        var id = req.params.id
        console.log("consulta por id");
        Pedidos.findOne({ _id: id }, function (err, pedido) {
            if (err) return res.status(500).json({ message: 'Se ha producido un error al obtener el pedido' })
            if (!pedido) return res.status(404).json({ message: 'No tenemos este pedido' })
            return res.json(pedido)
        })
    },

    //Insertar elemento en la BBDD (POST)
    create: function (req, res) {
        var pedido = new Pedidos(req.body)
        pedido.save(function (err, pedido) {
            if (err) return res.status(500).json({
                message: 'Error al guardar el pedido',
                error: err
            })
            return res.status(201).json({
                message: 'saved',
                _id: pedido._id
            })
        })
    },

    //Actualizar elemento en la BBDD (PUT)
    update: function (req, res) {
        Pedidos.findOneAndUpdate({ id: req.params.id }, req.body, { new: true })
            .then((nuevoPedido) => {
                nuevoPedido.save()
                    .then((saved) => res.json(nuevoPedido))
                    .catch((err) => res.status(422).json(err))
            })
            .catch(err => res.status(422).json(err));
    },


    //Borramos un elemento de la tabla en base a su ID. (DELETE)
    remove: async function (req, res) {
        var id = req.params.id
        await Pedidos.findByIdAndRemove(id, function (err, pedido) {
            if (err) return res.json(500, { message: 'No hemos encontrado la pedido' })
            return res.json(pedido)
        })
    }
}