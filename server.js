const WebhookClient = require("dialogflow-fulfillment");
const bodyParser = require("body-parser");
const axios = require("axios");
const express = require("express");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/wbhcristal", async function (request, response) {
  const agent = new WebhookClient({ request: request, response: response });
  const intentName = agent.intent;

  if(intentName == 'teste') {
    var pat1 = request.body.queryResult.parameters['pat1'];

    try {
      const res = await axios.get("https://cristaltelecom.glitch.me/wbhcristal");
      res.data.map(person => {
        if (person.pat1 === pat1) {
          response.json({
            "fulfillmentText": "Detalhes para o pat1 " + pat1 + ":" + "\n" +
              "ID da Ordem de Serviço: " + person.id + "\n" +
              "Nome do Cliente: " + person.Nome + "\n" +
              "Patrimônio Nº1: " + person.pat1 + "\n" +
              "Patrimônio Nº2: " + person.pat2 + "\n" +
              "Data da Configuração: " + person.data + "\n" +
              "Hora da Configuração: " + person.hora + "\n" +
              "Tipo da Configuração: " + person.tipo + "\n" +
              "Responsável da Configuração: " + person.responsavel + "\n" +
              "Link do Resultado: " + person.speedtest + "\n"
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
});
