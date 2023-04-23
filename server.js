const express = require("express");
const app = express();
const axios = require ("axios");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));
app.get("/", function (request, response) {
  response.sendFile(__dirname + "/views/index.html");
});

app.post("/wbhcristal", function (request, response) {
  var intentName = request.body.queryResult.intent.displayName;

 if(intentName == 'NOME INTENCAO'){
 var Pedido = request.body.queryResult.parameters['Pedido'];

 return axios.get("https://sheetdb.io/api/v1/w0t5ql0i871kj").then(res => {
 res.data.map(person => {
 if (person.Pedido === Pedido)
 response.json({"fulfillmentText" :"Detalhes para o pedido "+Pedido+":"+"\n"+
 "Nome: "+person.Nome+"\n"+
 "Status: "+person.Status});
 });
 });
 }


const listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
