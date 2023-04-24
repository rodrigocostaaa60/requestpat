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
        (person) =>
          person.id === pat1 ||
          person.pat1 === pat1 ||
          person.pat2 === pat1
      );
      if (results.length > 0) {
        const person = results[0];
        const fulfillmentText =
          "*🔍 Detalhes para a Sua Busca:* " +
          "\n" +
          "\n" +
          "*🆔 ID da Ordem de Serviço:* " +
          person.id +
          "\n" +
              "*🔧 Tipo da Ordem:* " +
          person.tipo +
          "\n" +
          "*👤 Nome do Cliente:* " +
          person.nome +
          "\n" +
          "*💻 Patrimônio Nº1:* " +
          person.pat1 +
          "\n" +
          "*💻 Patrimônio Nº2:* " +
          person.pat2 +
          "\n" +
          "*📅 Data da Configuração:* " +
          person.data +
          "\n" +
          "*⏰ Hora da Configuração:* " +
          person.hora +
          "\n" +
          "*👷 Responsável pela Configuração:* " +
          person.responsavel +
          "\n" +
          "*🌐 Teste de Conexão:* " +
          person.speedtest +
          "\n" +
        "\n" +
        "*👀 Aí vai uma dica: você pode encontrar todas as configurações da rede Wi-Fi e PPPoE dos clientes nesse link: https://www.appsheet.com/start/ad91934c-eea5-437f-8a35-44e32589e724 🚀💻* " +
          "\n";
        response.json({ fulfillmentText });
      } else {
        response.json({
          fulfillmentText:
            "🚨 Desculpe, não foi possível encontrar detalhes para o *ID* ou *Patrimônio* informado. Tente novamente ou verifique se os dados estão corretos. 🧐",
        });
      }
    } catch (error) {
      console.log(error);
      response.json({
        fulfillmentText:
          "🚫 *Opa, algo deu errado!* 🚫 Infelizmente, não foi possível processar a sua solicitação no momento. Por favor, tente novamente mais tarde. 💻💥",
      });
    }
  }
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
