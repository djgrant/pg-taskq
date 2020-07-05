const df = require("date-fns/fp");
const { compose } = require("lodash/fp");
const { setup } = require("./utils");

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

  const expectedDate = df.addYears(1, new Date());

  expect(execute_at).toMatchDate(expectedDate);
});

test("executeIn composite interval", async () => {
  const { execute_at } = await taskq.schedule({
    name: "Scheduling Task",
    executeIn: "2 year 3 days 7 minutes",
  });

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

  expect(execute_at).toEqual(date);
});

test("executeTodayAt", async () => {
  const { execute_at } = await taskq.schedule({
    name: "Scheduling Task",
    executeTodayAt: "12:06",
  });

  const expectedDate = compose(
    df.addHours(12),
    df.addMinutes(6)
  )(df.startOfDay(new Date()));

  expect(execute_at).toMatchDate(expectedDate);
});
