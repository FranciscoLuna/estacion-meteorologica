var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var helmet = require("helmet");
var app = express();






app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(helmet());


var port = (process.env.PORT || 10000);

app.listen(port, () => {console.log("El webService está a la escucha en el puerto " + port);});