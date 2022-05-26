//incluimos Mongoose y abrimos una conexión
let mongoose = require("mongoose");
let user = 'almarket';
let pass = "almPass123";
let password = "vcdzzfhCm3:_TVw";
let MONGO_URL = `mongodb+srv://${user}:${pass}@cluster0.rjtmj.mongodb.net/almarket?retryWrites=true&w=majority`;
mongoose.connect(MONGO_URL);

mongoose.connection.on("connected", function () {
  console.log("Conectado a la base de datos: " + MONGO_URL);
});

mongoose.connection.on("error", function (err) {
  console.log("Error al conextar a la base de datos: " + err);
});

mongoose.connection.on("disconnected", function () {
  console.log("Desconectado de la base de datos");
});

process.on("SIGINT", function () {
  mongoose.connection.close(function () {
    console.log("Desconectado de la base de datos al terminar la app");
    process.exit(0);
  });
});
