const Pedido = require("./models/Pedidos");


function startPurge(){
    Pedidos.find(function (err, pedidos) {
        //if (err) return res.status(500).json({ message: "Error obteniendo el pedido" });
        console.log(new Date().toLocaleString() + " Purge");
        console.log (res.json(pedidos));
    });
}


/*
  purge: function (req, res) {
    Pedidos.find(function (err, pedidos) {
      if (err) return res.status(500).json({ message: "Error obteniendo el pedido" });
      console.log(new Date().toLocaleString() + " Purge");
      return res.json(pedidos);
    });
  },*/