const express = require("express");
const cors = require("cors");

const router = require("../src/routes/routes");

const app = express();

app.use(express.static("public"));
app.use(cors());
app.use(express.json());
app.use(router);

app.get("/", (request, response) => {
  response.send("API rodando 🚀");
});

if (process.env.NODE_ENV !== "production") {
  const port = 4000;
  app.listen(port, () => console.log(`Rodando na porta ${port}`));
}

module.exports = app;
