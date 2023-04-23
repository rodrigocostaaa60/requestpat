const express = require("express"); 
const app = express(); 

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));



app.use(express.static("public")); 
app.get("/", function(request, response) {
response.sendFile(__dirname + "/views/index.html");
});

app.post("/wbhcristal", function(request, response) {
var intentName = request.body.queryResult.intent.displayName;

  
  

  
if (intentName == "cristal2020*") {

 response.json({ "fulfillmentText" : "Isso aqui é um Teste"});
 }
});





const listener = app.listen(process.env.PORT, function() {
console.log("Your app is listening on port " + listener.address().port);
});