const { deserializeError } = require("serialize-error");

const getErrorMeta = (err) =>
  Object.entries(err).reduce(
    (acc, [k, v]) => Object.assign(acc, { [k]: v }),
    {}
  );

const formatLog = (log) => {
  let message = log.message;

  if (
    message !== null &&
    typeof message === "object" &&
    "name" in message &&
    "stack" in message &&
    "message" in message
  ) {
    message = deserializeError(log.message);

    if (Object.keys(message).length) {
      message =
        message.stack + "\n" + JSON.stringify(getErrorMeta(message), null, 4);
    }
  } else {
    message = JSON.stringify(message, null, 4);
  }

  return {
    ...log,
    message,
  };
};

module.exports = { formatLog };
