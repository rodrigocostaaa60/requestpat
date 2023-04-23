const { WebhookClient } = require("dialogflow-fulfillment");
const bodyParser = require("body-parser");
const axios = require("axios");
const express = require("express");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/wbhcristal", async function (request, response) {
  const agent = new WebhookClient({ request: request, response: response });
  const intentName = agent.intent;

  if (intentName === "teste") {
    const pat1 = request.body.queryResult.parameters["pat1"];

    try {
  const res = await axios.get("https://sheetdb.io/api/v1/w0t5ql0i871kj");
  const results = res.data.filter(
    (person) => person.id === pat1 ||
                person.nome === pat1 ||
                person.pat1 === pat1 ||
                person.pat2 === pat1
);
      if (results.length > 0) {
        const person = results[0];
        const fulfillmentText =
          "*Detalhes para a Sua Busca:* " +
          "\n" +
          "\n" +
          "*ID da Ordem de Serviço:* " +
          person.id +
          "\n" +
          "*Nome do Cliente:* " +
          (person.nome ? person.nome : "N/A") +
          "\n" +
          "*Patrimônio Nº1:* " +
          person.pat1 +
          "\n" +
          "*Patrimônio Nº2:* " +
          person.pat2 +
          "\n" +
          "*Data da Configuração:* " +
          person.data +
          "\n" +
          "*Hora da Configuração:* " +
          person.hora +
          "\n" +
          "*Tipo da Configuração:* " +
          person.tipo +
          "\n" +
          "*Responsável da Configuração:* " +
          person.responsavel +
          "\n" +
          "*Link do Resultado:* " +
          person.speedtest +
          "\n";
        response.json({ fulfillmentText });
      } else {
        response.json({
          fulfillmentText:
            "Não foi possível encontrar detalhes para o pat1 ou pat2 informado.",
        });
      }
    } catch (error) {
      console.log(error);
      response.json({
        fulfillmentText:
          "Ocorreu um erro ao processar sua solicitação. Tente novamente mais tarde.",
      });
    }
  }
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
