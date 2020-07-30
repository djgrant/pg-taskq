import { deserializeError } from "serialize-error";

const getErrorMeta = (err: Error) =>
  Object.entries(err).reduce(
    (acc, [k, v]) => Object.assign(acc, { [k]: v }),
    {}
  );

export const formatLogMessage = (message: any) => {
  if (
    message !== null &&
    typeof message === "object" &&
    "name" in message &&
    "stack" in message &&
    "message" in message
  ) {
    message = deserializeError(message);

    if (Object.keys(message).length) {
      message =
        message.stack + "\n" + JSON.stringify(getErrorMeta(message), null, 4);
    }
  } else {
    message = JSON.stringify(message, null, 4);
  }

  return message;
};
