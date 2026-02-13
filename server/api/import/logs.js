const connectDB = require("../../../src/config/db");
const ImportLog = require("../../../src/models/ImportLog");

module.exports = async (req, res) => {
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