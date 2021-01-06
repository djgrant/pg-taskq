import { deserializeError } from "serialize-error";
import indentString from "indent-string";

export function formatLogMessage(message: any) {
  return JSON.stringify(message, replacer, 4)
    .replace(/\\+n/g, "\n")
    .replace(/\\+/g, "");
}

const replacer = (_: string, value: any) => {
  if (
    value !== null &&
    typeof value === "object" &&
    "name" in value &&
    "stack" in value &&
    "message" in value
  ) {
    value = deserializeError(value);

    if (Object.keys(value).length) {
      value =
        value.stack +
        "\n" +
        indentString(JSON.stringify(getErrorMeta(value), replacer, 4), 4);
    } else {
      value = value.stack;
    }
  }

  return value;
};

function getErrorMeta(err: Error) {
  return Object.entries(err).reduce(
    (acc, [k, v]) => Object.assign(acc, { [k]: v }),
    {}
  );
}
