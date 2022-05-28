var express = require("express"); //llamamos a Express
var app = express();
app.use(express.json());
const path = require("path");
app.use("/uploads", express.static(path.join("D:\\Proyectos\\almarket-backend\\", "uploads")));
require("./db");

app.use(express.json({ limit: "100mb" }));

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions)); // Use this after the variable declaration

var port = process.env.PORT || 8000; // establecemos nuestro puerto

// nuestra ruta irá en http://localhost:8080/api
var router = require("./routes");
const { purge } = require("./routes");
const pedidosController = require("./controllers/pedidosController");
app.use("/api", router);

//arrancamos el servidor
app.listen(port);
console.log("API escuchando en el puerto " + port);


setInterval(()=> pedidosController.autoPurge(),86400000);
