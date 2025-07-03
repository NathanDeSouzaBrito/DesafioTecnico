const app = require("./app");
const dbUrl = process.env.DATABASE_URL;
const PORT = process.env.PORT || 3001;

require("dotenv").config();

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

app.listen(dbUrl, () => {
  console.log(`Banco de dados conectado em ${dbUrl}`);
})