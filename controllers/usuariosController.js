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
        //console.log(req.body);
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
        //var id = req.params.id
        /*Usuarios.findOneAndUpdate({ _id: req.params.id }, {
            Nombre: req.body.Nombre,
            Apellido1: req.body.Apellido1,
            Apellido2: req.body.Apellido2,
            Telefono: req.body.Telefono,
            Email: req.body.Email,
            Direccion: req.body.Direccion,
            Usuario: req.body.Usuario,
            Password: req.body.Password
        }, function (err, doc) {
            if (err) return res.send(500, { error: err });
            return res.send('Succesfully saved.');
        });*/

        /*Usuarios.findByIdAndUpdate(req.params.id, req.body,{new:true},(err,usuario)=>{
            if (err) return res.status(500).send(err);
            return res.send(usuario);
        })*/


        Usuarios.findOne({ _id: req.params.id }, function (err, usuario) {
            if (err) return res.status(500).json({
                message: 'Se ha producido un error al guardar el usuario',
                error: err
            })
            if (!usuario) return res.status(404).json({ message: 'No hemos encontrado el usuario' })
            console.log("usuario antes de setear: "+usuario);
            usuario.nombre = req.body.Nombre;
            usuario.apellido1 = req.body.Apellido1;
            usuario.apellido2 = req.body.Apellido2;
            usuario.telefono = req.body.Telefono;
            usuario.email = req.body.Email;
            usuario.direccion = req.body.Direccion;
            usuario.usuario = req.body.Usuario;
            usuario.password = req.body.Password;
            console.log("usuario después de setear: "+usuario);
            usuario.save(function (err, usuario) {
                if (err) return res.status(500).json({ message: 'Error al guardar la usuario' })
                //return res.status(200).send({_id:usuario._id});
                return res.json(usuario)
            })
        })
    },


    //Borramos un elemento de la tabla en base a su ID. (DELETE)
    remove: async function (req, res) {
        var id = req.params.id
        await Usuarios.findByIdAndRemove(id, function (err, usuario) {
            if (err) return res.json(500, { message: 'No hemos encontrado la usuario' })
            return res.json(usuario)
        })
    }
}