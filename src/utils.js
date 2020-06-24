const getLogLevel = (level) => {
  if (typeof level === "string") {
    return {
      error: 0,
      warn: 1,
      info: 2,
      http: 3,
      verbose: 4,
      debug: 5,
      silly: 6,
    }[level];
  }
  return level;
};

module.exports = { getLogLevel };
