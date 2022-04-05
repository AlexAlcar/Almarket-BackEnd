var Impresores = require('../Models/Impresores')
module.exports = {
    // https://docs.mongodb.com/v3.0/reference/operator/query/text/

    //Búsqueda por KeyWord (GET)
    search: function (req, res) {
        var q = req.query.q
        Impresores.find({ $text: { $search: q } }, function (err, impresores) {
            if (err) return res.status(500).json({ message: 'Error en la búsqueda' })
            return res.json(impresores)
        })
    },

    //todos los elementos de la lista (GET)
    list: function (req, res) {
        Impresores.find(function (err, impresores) {
            if (err) return res.status(500).json({ message: 'Error obteniendo el impresor' })
            return res.json(impresores)
        })
    },

    //Listado toda la info en base a un id (GET)
    show: function (req, res) {
        var id = req.params.id
        Impresores.findOne({ _id: id }, function (err, impresor) {
            if (err) return res.status(500).json({ message: 'Se ha producido un error al obtener el impresor' })
            if (!impresor) return res.status(404).json({ message: 'No tenemos este impresor' })
            return res.json(impresor)
        })
    },

    //Insertar elemento en la BBDD (POST)
    create: function (req, res) {
        var impresor = new Impresores(req.body)
        impresor.save(function (err, impresor) {
            if (err) return res.status(500).json({
                message: 'Error al guardar el impresor',
                error: err
            })
            return res.status(201).json({
                message: 'saved',
                _id: impresor._id
            })
        })
    },

    //Actualizar elemento en la BBDD (PUT)
    update: function (req, res) {
        Impresores.findOneAndUpdate({ id: req.params.id }, req.body, { new: true })
            .then((nuevoUsuario) => {
                nuevoUsuario.save()
                    .then((saved) => res.json(nuevoUsuario))
                    .catch((err) => res.status(422).json(err))
            })
            .catch(err => res.status(422).json(err));
    },


    //Borramos un elemento de la tabla en base a su ID. (DELETE)
    remove: async function (req, res) {
        var id = req.params.id
        await Impresores.findByIdAndRemove(id, function (err, impresor) {
            if (err) return res.json(500, { message: 'No hemos encontrado el impresor' })
            return res.json(impresor)
        })
    },


    //Chequeamos si hay usuario con ese password
    login: function (req, res) {
        console.log("xx")
        var body = req.body;
        Impresores.findOne({ usuario: body.usuario }, function (err, usuario) {
            if (!usuario) return res.json(false);
            if (err) return res.status(500).json(false)
            if (usuario.password == body.password) return res.json(usuario._id)
            else return res.json(false)

        })
    }
}