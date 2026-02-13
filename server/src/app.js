const express = require("express");
const cors = require("cors");
const importRoutes = require("./routes/import.routes");

const app = express();

app.use(cors()); 
app.use(express.json());
app.use((req, res, next) => {
  console.log("Incoming request:", req.method, req.url);
  next();
});

app.use("/api/import", importRoutes);

module.exports = app;
