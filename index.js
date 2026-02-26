const database = require("./src/database/connection");
const express = require("express");
const cors = require("cors");
const cron = require("node-cron");

const router = require("./src/routes/routes");

const app = express();

app.use(express.static("public"));
app.use(cors());
app.use(express.json());
app.use(router);

app.listen(port, () => console.log(`Aplicação rodando na porta ${port}`));

app.get("/", (request, response) => {
  response.send(`Aplicação rodando na porta ${port}`);
});
