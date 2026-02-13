const fetchJobsFromFeed = require("./fetchJobs.service");
const jobQueue = require("../queues/jobQueue");
const ImportLog = require("../models/ImportLog");
const getFeedName = require("../utils/getFeedName");

const JOB_FEEDS = [
  "https://jobicy.com/?feed=job_feed",
  "https://jobicy.com/?feed=job_feed&job_categories=smm&job_types=full-time",
  "https://jobicy.com/?feed=job_feed&job_categories=data-science",
];

const runImport = async () => {
  for (const feed of JOB_FEEDS) {
    const jobs = await fetchJobsFromFeed(feed);

    const feedName = getFeedName(feed);

    const log = await ImportLog.create({
      fileName: feedName,
      totalFetched: jobs.length,
      totalImported: 0,
      newJobs: 0,
      updatedJobs: 0,
      failedJobs: [],
    });

    for (const job of jobs) {
      await jobQueue.add("import-job", {
        ...job,
        importId: log._id,
      });
    }

    console.log(
      `Feed: ${feedName} | Jobs Fetched: ${jobs.length}`
    );
  }

  return { message: "All feeds queued successfully" };
};

module.exports = runImport;
