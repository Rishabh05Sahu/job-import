const connectDB = require("../../src/config/db");
const runImport = require("../../src/services/import.service");

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "https://job-import-khaki.vercel.app");
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Method Not Allowed" });
    }

    await connectDB();

    const result = await runImport();
    return res.status(200).json(result);
  } catch (error) {
    console.error("Error in /api/import/run:", error);
    return res.status(500).json({ message: error.message });
  }
};