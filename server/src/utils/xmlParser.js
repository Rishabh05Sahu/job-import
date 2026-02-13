const xml2js = require("xml2js");

const parseXML = async (xmlData) => {
  const parser = new xml2js.Parser({
    explicitArray: false,
    strict: false, // keeps uppercase tags like RSS
    trim: true,
  });

  return parser.parseStringPromise(xmlData);
};

module.exports = parseXML;
