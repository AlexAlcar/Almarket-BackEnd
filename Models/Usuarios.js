var mongoose = require('mongoose')
var Schema = mongoose.Schema


var usuarioSchema = new Schema({
  nombre: String,
  apellido1: String,
  apellido2: String,
  telefono: String,
  email: String,
  direccion: String,
  usuario: String,
  password: String,
},{versionKey: false}
  );

var Usuario = mongoose.model('Usuario', usuarioSchema);
module.exports = Usuario;