const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    externalId: { type: String, unique: true, index: true },
    title: String,
    company: String,
    location: String,
    description: String,
    url: String,
    publishedAt: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);
