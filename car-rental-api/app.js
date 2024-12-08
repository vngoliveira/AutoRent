const express = require("express");
const cors = require("cors");
const { sequelize } = require("./models");
const userRoutes = require("./routes/userRoutes");
const carRoutes = require("./routes/carRoutes");
const initializeAdminUser = require('./config/initialize')
const reservationRoutes = require("./routes/reservationRoutes");
require("dotenv").config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3001",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);

app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/cars", carRoutes);
app.use("/api/reservations", reservationRoutes);

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexão com o banco de dados estabelecida com sucesso.");

    await sequelize.sync();
    await initializeAdminUser();

    app.listen(3000, () => {
      console.log("Servidor rodando na porta 3000");
    });
  } catch (error) {
    console.error("Erro ao iniciar o servidor:", error.message);
  }
};

startServer();
