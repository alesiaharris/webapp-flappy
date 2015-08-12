var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var app = express();
app.use(express.static(path.join(__dirname, "")));
app.use(bodyParser.urlencoded({extended:true}));


app.get("/", function(request, response){
    response.sendFile(path.join(__dirname, "pages/index.html"));
});

app.post("/score", function(request, response){
    response.send(request.body.fullName + " ("
    + request.body.email + "): " + request.body.score)

});

var server = app.listen(8080, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Bob's Flappy Bird listening at http://%s:%s", host, port);
});
