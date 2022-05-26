var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var usuarioSchema = new Schema(
  {
    nombre: String,
    apellido1: String,
    apellido2: String,
    telefono: String,
    email: String,
    direccion: String,
    perfil: String,
    impresoras: Number,
    tamanyo: Number,
    precio: Number,
    puntuacion: Number,
    valoraciones: Number,
    usuario: String,
    password: String,
  },
  { versionKey: false }
);

var Usuario = mongoose.model("Usuario", usuarioSchema);
module.exports = Usuario;
