const WebhookClient = require('dialogflow-fulfillment');
const bodyParser = require("body-parser");
const axios = require ("axios");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post('/wbhcristal', function(request,response){
 const agent = new WebhookClient({ request:request, response:response });




 if(intentName == 'patrimonios'){
 var Pedido = request.body.queryResult.parameters['Pedido'];

 return axios.get("LINK").then(res => {
 res.data.map(person => {
 if (person.Pedido === Pedido)
 response.json({"fulfillmentText" :"Detalhes para o pedido "+Pedido+":"+"\n"+
 "Nome: "+person.Nome+"\n"+
 "Status: "+person.Status
 });