const df = require("date-fns/fp");
const { compose } = require("lodash/fp");
const { setup, pause } = require("./utils");

let taskq;

beforeAll(async () => {
  taskq = await setup({ schema: "scheduling_test" });
  taskq.start();
});

afterAll(async () => {
  await taskq.stop();
});

test("executeIn simple interval", async () => {
  const { execute_at } = await taskq.schedule({
    name: "Scheduling Task",
    executeIn: "1 year",
  });

  taskq.take("Scheduling Task", () => {});

  const expectedDate = df.addYears(1, new Date());

  expect(execute_at).toMatchDate(expectedDate);
});

test("executeIn composite interval", async () => {
  const { execute_at } = await taskq.schedule({
    name: "Scheduling Task",
    executeIn: "2 year 3 days 7 minutes",
  });

  taskq.take("Scheduling Task", () => {});

  const expectedDate = compose(
    df.addYears(2),
    df.addDays(3),
    df.addMinutes(7)
  )(new Date());

  expect(execute_at).toMatchDate(expectedDate);
});

test("executeAtDateTime", async () => {
  const date = new Date("2020-01-02T12:01:02.123Z");

  const { execute_at } = await taskq.schedule({
    name: "Scheduling Task",
    executeAtDateTime: date,
  });

  taskq.take("Scheduling Task", () => {});

  expect(execute_at).toEqual(date);
});

test("executeTodayAt", async () => {
  const { execute_at } = await taskq.schedule({
    name: "Scheduling Task",
    executeTodayAt: "12:06",
  });

  taskq.take("Scheduling Task", () => {});

  const expectedDate = compose(
    df.addHours(12),
    df.addMinutes(6)
  )(df.startOfDay(new Date()));

  expect(execute_at).toMatchDate(expectedDate);
});

test("skipping already scheduled unique tasks", async () => {
  const executionMock = jest.fn();
  const now = new Date();

  await taskq.schedule({
    name: "Unique task",
    executeAtDateTime: now,
    params: {},
    context: { a: 1 },
  });

  await taskq.schedule({
    name: "Unique task",
    executeAtDateTime: now,
    params: {},
    context: { a: 1 },
  });

  taskq.take("Unique task", executionMock);

  await pause(250);
  await taskq.processingPromise;

  expect(executionMock).toBeCalledTimes(1);
});
