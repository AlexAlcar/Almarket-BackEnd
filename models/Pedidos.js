var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var pedidoSchema = new Schema(
  {
    id_usuario: String,
    id_impresor: String,
    usuario_impresor: String,
    usuario: String,
    descripcion: String,
    cantidad: String,
    estado: String,
    direccion: String,
    precioTotal: String,
    tamanyo: String,
    material: String,
    fecha_entrega: String,
    estado: String,
    color: String,
    fichero: String,
  },
  { versionKey: false }
);

var Pedido = mongoose.model("Pedido", pedidoSchema);
module.exports = Pedido;
