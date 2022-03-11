var mongoose = require('mongoose')
var Schema = mongoose.Schema


var pedidoSchema = new Schema({
  id_usuario: String,
  id_impresor: String,
  descripcion: String,
  cantidad: String,
  material: String,
  fecha_entrega: String,
  estado: String,
  color: String,
},{versionKey: false}
  );

var Pedido = mongoose.model('Pedido', pedidoSchema);
module.exports = Pedido;