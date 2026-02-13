const axios = require("axios");
const parseXML = require("../utils/xmlParser");

const fetchJobsFromFeed = async (url) => {
  try {
    const response = await axios.get(url);
    const parsed = await parseXML(response.data);

    let items = [];

    if (parsed?.RSS?.CHANNEL?.ITEM) {
      const channel = Array.isArray(parsed.RSS.CHANNEL)
        ? parsed.RSS.CHANNEL[0]
        : parsed.RSS.CHANNEL;

      items = channel.ITEM;
    }

    if (!items) return [];

    const jobs = Array.isArray(items) ? items : [items];

    return jobs.map((job) => ({
      externalId: job.GUID?._ || job.LINK,
      title: job.TITLE,
      company: job["DC:CREATOR"] || "Unknown",
      location: job.CATEGORY || "Remote",
      description: job.DESCRIPTION || "",
      url: job.LINK,
      publishedAt: new Date(job.PUBDATE || Date.now()),
    }));
  } catch (error) {
    console.error(`Error fetching ${url}`, error.message);
    return [];
  }
};

module.exports = fetchJobsFromFeed;
