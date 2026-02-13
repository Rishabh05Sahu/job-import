const connectDB = require("../../src/config/db");
const ImportLog = require("../../src/models/ImportLog");

module.exports = async (req, res) => {
  // Basic CORS headers
  res.setHeader("Access-Control-Allow-Origin", "https://job-import-khaki.vercel.app");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    if (req.method !== "GET") {
      return res.status(405).json({ message: "Method Not Allowed" });
    }

    await connectDB();

    const logs = await ImportLog.find().sort({ timestamp: -1 });
    return res.status(200).json(logs);
  } catch (error) {
    console.error("Error in /api/import/logs:", error);
    return res.status(500).json({ message: error.message });
  }
};