//dependencies
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

//create express server
var app = express();

//sets up a port
var PORT = process.env.PORT || 5000;

//static file
app.use(express.static(path.join(__dirname, "./app/public")));

//make it easy for the server to interpret the data sent ot it
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
// app.use(bodyParser.text());
// app.use(bodyParser.json({type: "application/vnd.api + json"}));

//router
require(path.join(__dirname, "./app/routing/apiRoutes"))(app);
require(path.join(__dirname, "./app/routing/htmlRoutes"))(app);

//listening to the port 5000
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});