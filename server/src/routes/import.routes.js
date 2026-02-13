const express = require("express");
const runImport = require("../services/import.service");
const ImportLog = require("../models/ImportLog");

const router = express.Router();

router.get("/logs", async (req, res) => {
  try {
    console.log("Logs route hit");

    const logs = await ImportLog.find().sort({ timestamp: -1 });

    res.json(logs);
  } catch (error) {
    console.error("Error fetching logs:", error);
    res.status(500).json({ message: error.message });
  }
});


router.post("/run", async (req, res) => {
  try {
    const result = await runImport();
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});


router.get("/logs", async (req, res) => {
  const logs = await ImportLog.find().sort({ timestamp: -1 });
  res.json(logs);
});

module.exports = router;
