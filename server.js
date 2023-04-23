const WebhookClient = require('dialogflow-fulfillment');
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post("/wbhcristal", function (request, response) {
  var intentName = request.body.queryResult.intent.displayName;

  if (intentName == "patrimonios") {
    var searchTerm = request.body.queryResult.parameters["searchTerm"];

    axios
      .get("https://sheetdb.io/api/v1/w0t5ql0i871kj")
      .then((res) => {
        const results = res.data.filter((person) => {
          return Object.keys(person).some((key) => person[key] === searchTerm);
        });

        let fulfillmentText = "";
        results.forEach((person) => {
          fulfillmentText +=
            "Detalhes para o Patrimônio: " +
            person.pat1 +
            ":\n" +
            "ID da Ordem de Serviço: " +
            person.id +
            "\n" +
            "Nome do Cliente: " +
            person.nome +
            "\n" +
            "Patrimônio Nº1: " +
            person.pat1 +
            "\n" +
            "Patrimônio Nº2: " +
            person.pat2 +
            "\n" +
            "Data da Configuração: " +
            person.data +
            "\n" +
            "Hora da Configuração: " +
            person.hora +
            "\n" +
            "Tipo da Configuração: " +
            person.tipo +
            "\n" +
            "Responsável da Configuração: " +
            person.responsavel +
            "\n" +
            "Link do Resultado: " +
            person.speedtest +
            "\n\n";
        });

        response.json({
          fulfillmentText: fulfillmentText,
        });
      })
      .catch((err) => {
        console.error(err);
        response.status(500).send("Oops, deu erro no servidor... :/");
      });
  } else {
    response
      .status(400)
      .send(
        "Poxa vida, não achei o que você pediu! Tenta de novo, vai que agora dá certo!"
      );
  }
});
