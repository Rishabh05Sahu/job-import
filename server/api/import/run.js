const connectDB = require("../../src/config/db");
const runImport = require("../../src/services/import.service");

module.exports = async (req, res) => {
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