const { Worker } = require("bullmq");
const connection = require("../config/redis");
const Job = require("../models/Job");
const ImportLog = require("../models/ImportLog");

const worker = new Worker(
  "job-import-queue",
  async (job) => {
    const { importId, ...jobData } = job.data;

    try {
      const existing = await Job.findOne({
        externalId: jobData.externalId,
      });

      if (existing) {
        await Job.updateOne(
          { externalId: jobData.externalId },
          jobData
        );

        await ImportLog.findByIdAndUpdate(importId, {
          $inc: { updatedJobs: 1, totalImported: 1 },
        });
      } else {
        await Job.create(jobData);

        await ImportLog.findByIdAndUpdate(importId, {
          $inc: { newJobs: 1, totalImported: 1 },
        });
      }
    } catch (error) {
      await ImportLog.findByIdAndUpdate(importId, {
        $push: {
          failedJobs: {
            reason: error.message,
            jobId: jobData.externalId,
          },
        },
      });

      throw error;
    }
  },
  {
    connection,
    concurrency: 10,
  }
);



worker.on("completed", (job) => {
  console.log("Processed:", job.id);
});

worker.on("failed", (job, err) => {
  console.error("Failed:", err.message);
});

module.exports = worker;
