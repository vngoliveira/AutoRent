const express = require("express");
const cors = require("cors");
const { sequelize } = require("./models");
const userRoutes = require("./routes/userRoutes");
const carRoutes = require("./routes/carRoutes");
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

sequelize
  .authenticate()
  .then(() =>
    console.log("Conexão com o banco de dados estabelecida com sucesso.")
  )
  .catch((err) => console.log("Erro ao conectar ao banco de dados:", err));

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
