var mongoose = require('mongoose')
var Schema = mongoose.Schema


var impresoresSchema = new Schema({
  nombre: String,
  apellido1: String,
  apellido2: String,
  telefono: String,
  email: String,
  impresoras: String,
  materiales: Array,
  valoraciones: String,
  puntuacion: String,
  usuario: String,
  password: String,
},{versionKey: false}
  );

var kk = mongoose.model('Impresores', impresoresSchema);
module.exports = kk;