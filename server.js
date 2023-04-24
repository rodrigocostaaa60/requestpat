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
  let fulfillmentText = "*🔍 Detalhes para a Sua Busca:* " + "\n" + "\n";
  
  if (person.id) {
    fulfillmentText += "*🆔 ID da Ordem de Serviço:* " + person.id + "\n";
  }

  if (person.tipo) {
    fulfillmentText += "*🔧 Tipo da Ordem:* " + person.tipo + "\n";
  }

  if (person.nome) {
    fulfillmentText += "*👤 Nome do Cliente:* " + person.nome + "\n";
  }

  if (person.pat1) {
    fulfillmentText += "*💻 Patrimônio Nº1:* " + person.pat1 + "\n";
  }

  if (person.pat2) {
    fulfillmentText += "*💻 Patrimônio Nº2:* " + person.pat2 + "\n";
  }

  if (person.data) {
    fulfillmentText += "*📅 Data da Configuração:* " + person.data + "\n";
  }

  if (person.hora) {
    fulfillmentText += "*⏰ Hora da Configuração:* " + person.hora + "\n";
  }

  if (person.responsavel) {
    fulfillmentText += "*👷 Responsável pela Configuração:* " + person.responsavel + "\n";
  }

  if (person.speedtest) {
    fulfillmentText += "*🌐 Teste de Conexão:* " + person.speedtest + "\n"
  }
        if (person.nome) {
    fulfillmentText += "\n" +
        "*👀 Aí vai uma dica: você pode encontrar todas as configurações da rede Wi-Fi e PPPoE dos clientes nesse link: https://www.appsheet.com/start/ad91934c-eea5-437f-8a35-44e32589e724 🚀💻* " +
          "\n";
  }
        
        response.json({ fulfillmentText });
      } else {
        response.json({
          fulfillmentText:
            "🚨 Ops, infelizmente não conseguimos encontrar informações para o *ID* ou *Patrimônio* informado."  
          "Por favor, certifique-se de que os dados estão corretos. É importante lembrar que este recurso está disponível apenas em *Jaguaquara* no momento.""\n" +
          "\n" +"Caso esteja procurando o *ID*, você pode encontrá-lo ao lado do nome do cliente na ordem de serviço. Já o *Patrimônio* pode ser encontrado na parte debaixo do documento, escrito à caneta. 🧐"
          "\n" +"Se precisar de mais assistência, entre em contato aqui pelo WhatsApp 📲. Estou pronto para ajudá-lo! 😊"
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
