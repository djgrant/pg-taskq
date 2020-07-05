const df = require("date-fns");

expect.extend({
  toMatchDate(received, expected) {
    const diff = Math.abs(df.differenceInSeconds(received, expected));
    return diff < 1
      ? { pass: true }
      : {
          pass: false,
          message: () =>
            `Dates differ by ${diff} seconds.\nReceived: ${received}\nExpected: ${expected}`,
        };
  },
});
