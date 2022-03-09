var mongoose = require('mongoose')
var Schema = mongoose.Schema


var impresorSchema = new Schema({
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
  password: String
},{versionKey: false}
  );

var Impresor = mongoose.model('Impresor', impresorSchema);
module.exports = Impresor;