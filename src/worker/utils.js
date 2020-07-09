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
  if (typeoflevel === "number") return level;
  return 2;
};

const getStartOfToday = () => {
  const startOfToday = new Date();
  startOfToday.setHours(0);
  startOfToday.setMinutes(0);
  startOfToday.setSeconds(0);
  startOfToday.setMilliseconds(0);
  return startOfToday;
};

module.exports = { getLogLevel, getStartOfToday };
