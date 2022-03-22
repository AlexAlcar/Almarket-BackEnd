var Usuarios = require('../models/Usuarios')
module.exports = {
    // https://docs.mongodb.com/v3.0/reference/operator/query/text/

    //Búsqueda por KeyWord (GET)
    search: function (req, res) {
        var q = req.query.q
        Usuarios.find({ $text: { $search: q } }, function (err, usuarios) {
            if (err) return res.status(500).json({ message: 'Error en la búsqueda' })
            return res.json(usuarios)
        })
    },

    //todos los elementos de la lista (GET)
    list: function (req, res) {
        Usuarios.find(function (err, usuarios) {
            if (err) return res.status(500).json({ message: 'Error obteniendo el usuario' })
            return res.json(usuarios)
        })
    },

    //Listado toda la info en base a un id (GET)
    show: function (req, res) {
        var id = req.params.id
        Usuarios.findOne({ _id: id }, function (err, usuario) {
            if (err) return res.status(500).json({ message: 'Se ha producido un error al obtener el usuario' })
            if (!usuario) return res.status(404).json({ message: 'No tenemos este usuario' })
            return res.json(usuario)
        })
    },

    //Insertar elemento en la BBDD (POST)
    create: function (req, res) {
        var usuario = new Usuarios(req.body)
        usuario.save(function (err, usuario) {
            if (err) return res.status(500).json({
                message: 'Error al guardar el usuario',
                error: err
            })
            return res.status(201).json({
                message: 'saved',
                _id: usuario._id
            })
        })
    },

    //Actualizar elemento en la BBDD (PUT)
    update: function (req, res) {
        Usuarios.findOneAndUpdate({ id: req.params.id }, req.body, { new: true })
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
        await Usuarios.findByIdAndRemove(id, function (err, usuario) {
            if (err) return res.json(500, { message: 'No hemos encontrado la usuario' })
            return res.json(usuario)
        })
    },



    //Chequeamos si hay usuario con ese password
    login: function (req, res) {
        var body = req.body;
        Usuarios.findOne({ usuario: body.usuario }, function (err, usuario) {
            //console.log(body)
            //console.log("Encontrado: "+usuario.usuario+" "+usuario.password)
            //if (!usuario) return res.json('El usuario no existe');

            if (!usuario) return res.json(false);
            if (err) return res.status(500).json(false)

            if (usuario.password == body.password)
                return res.json(true)
            else return res.json(false)

            /*if(usuario.password==body.password)return "ok";
            else return "nok";*/
        })
    }
}