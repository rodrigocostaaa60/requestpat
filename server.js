const WebhookClient = require('dialogflow-fulfillment');
const bodyParser = require("body-parser");
const axios = require ("axios");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post('/wbhcristal', function(request,response){
 const agent = new WebhookClient({ request:request, response:response });




 if(intentName == 'patrimonios'){
  var pat1 = request.body.queryResult.parameters['pat1'];
  var pat2 = request.body.queryResult.parameters['pat2'];


 return axios.get("https://sheetdb.io/api/v1/w0t5ql0i871kj").then(res => {
 res.data.map(person => {
 if (person.pat1 === pat1)
 response.json({"fulfillmentText" :"Detalhes para o Patrimônio: "+Pedido+":"+"\n"+
 "ID da Ordem de Serviço: "+person.id+"\n"+
 "Nome do Cliente: "+person.Nome+"\n"+
"Patrimônio Nº1: "+person.pat1+"\n"+
"Patrimônio Nº2: "+person.pat2+"\n"+
"Data da Configuração: "+person.data+"\n"+
"Hora da Configuração: "+person.hora+"\n"+
"Tipo da Configuração: "+person.tipo+"\n"+
"Responsável da Configuração: "+person.responsavel+"\n"+
"Link do Resultado: "+person.speedtest+"\n"+


 });