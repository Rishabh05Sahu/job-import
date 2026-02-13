const getFeedName = (url) => {
  const parsedUrl = new URL(url);
  const params = parsedUrl.searchParams;

  const category = params.get("job_categories");

  if (category) return category;

  return "all";
};

module.exports = getFeedName;
