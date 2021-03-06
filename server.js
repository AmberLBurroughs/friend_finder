// htmlRoutes
var express = require("express");
var bodyParser = require("body-parser");

var app = express();

var PORT = process.env.PORT || 3000;

// convert elements to json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// read static files
app.use(express.static('./app/public'))

//routes
require("./app/routes/htmlRoutes")(app);

require("./app/routes/apiRoutes")(app);

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});