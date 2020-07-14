const cp = require("child_process");
const util = require("util");
const pg = require("pg");
const { TaskQ } = require("..");

const exec = util.promisify(cp.exec);

const connectionString = process.env.DATABASE_URL;
const client = new pg.Client({ connectionString });

const migrate = (schema) =>
  exec(`./bin/taskq.sh up -f -c ${connectionString} -s ${schema}`);

const setup = async (opts) => {
  await migrate(opts.schema);
  return new TaskQ({
    db: { connectionString },
    processQueueEvery: 10,
    maxAttempts: 3,
    backoffDelay: "50 milliseconds",
    backoffDecay: "linear",
    ...opts,
  });
};

const pause = async (interval) =>
  new Promise((resolve) => setTimeout(resolve, interval));

module.exports = {
  client,
  connectionString,
  exec,
  migrate,
  pause,
  setup,
};
