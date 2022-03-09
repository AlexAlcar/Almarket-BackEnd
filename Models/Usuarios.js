var mongoose = require('mongoose')
var Schema = mongoose.Schema


var usuarioSchema = new Schema({
  Nombre: String,
  Apellido1: String,
  Apellido2: String,
  Telefono: String,
  Email: String,
  Direccion: String,
  Usuario: String,
  Password: String,
},{versionKey: false}
  );

var Usuario = mongoose.model('Usuario', usuarioSchema);
module.exports = Usuario;