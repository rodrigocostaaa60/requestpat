const path = require("path");

const fastify = require("fastify")({
logger: false,
});

fastify.register(require("@fastify/static"), {
root: path.join(__dirname, "public"),
prefix: "/",
});

fastify.register(require("@fastify/formbody"));

fastify.register(require("@fastify/view"), {
engine: {
handlebars: require("handlebars"),
},
});

const seo = require("./src/seo.json");
if (seo.url === "glitch-default") {
seo.url = https:
}

fastify.get("/", function (request, reply) {
let params = { seo: seo };

if (request.query.randomize) {
const colors = require("./src/colors.json");
const allColors = Object.keys(colors);
let currentColor = allColors[(allColors.length * Math.random()) << 0];

= {
  color: colors[currentColor],
  colorError: null,
  seo: seo,
};
}

return reply.view("/src/pages/index.hbs", params);
});

fastify.post("/", function (request, reply) {
let params = { seo: seo };

let color = request.body.color;

if (color) {
color = color.toLowerCase().replace(/\s/g, "");

csharp
Copy code
const colors = require("./src/colors.json");

if (colors[color]) {
  params = {
    color: colors[color],
    colorError: null,
    seo: seo,
  };
} else {
  params = {
    colorError: request.body.color,
    seo: seo,
  };
}
}

return reply.view("/src/pages/index.hbs", params);
});

fastify.listen(
{ port: process.env.PORT, host: "0.0.0.0" },
function (err, address) {
if (err) {
console.error(err);
process.exit(1);
}
console.log(Your app is listening on ${address});
}
);