const express = require("express");
const importRoutes = require("./routes/import.routes");

const app = express();

app.use(express.json());

app.use("/api/import", importRoutes);

module.exports = app;
