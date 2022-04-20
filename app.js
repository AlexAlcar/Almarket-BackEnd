var express = require('express') //llamamos a Express
var app = express();
app.use(express.json());






require('./db')

app.use(express.json({ limit: '50mb' }));
//app.use(express.urlencoded({ limit: '50mb' }));


const cors = require("cors");
const corsOptions = {
   origin: '*',
   credentials: true,            //access-control-allow-credentials:true
   optionSuccessStatus: 200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration

var port = process.env.PORT || 8080  // establecemos nuestro puerto

//app.use(bodyParser.urlencoded({ extended: true }))
//app.use(bodyParser.json())

// nuestra ruta irá en http://localhost:8080/api
var router = require('./routes')
app.use('/api', router)

//arrancamos el servidor
app.listen(port)
console.log('API escuchando en el puerto ' + port)