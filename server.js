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

 if(intentName == 'patrimonios'){
 var pat1 = request.body.queryResult.parameters['pat1'];

 return axios.get("https://sheetdb.io/api/v1/w0t5ql0i871kj").then(res => {
 res.data.map(person => {
 if (person.pat1 === pat1)
 response.json({"fulfillmentText" :"Detalhes para o Patrimônio: "+pat1+":"+"\n"+
 "ID da Ordem de Serviço: "+person.id+"\n"+
 "Nome do Cliente: "+person.nome+"\n"+
 "Patrimônio Nº1: "+person.pat1+"\n"+
 "Patrimônio Nº2: "+person.pat2+"\n"+
"Data da Configuração: "+data+"\n"+
"Hora da Configuração: "+hora+"\n"+
"Tipo da Configuração: "+tipo+"\n"+
"Responsável da Configuração: "+responsavel+"\n"+
               
               });
 });
 });
 }


const listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});