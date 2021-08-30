const request = require("supertest");
const app = require("../src/app");
const Task = require("../src/models/task");

const {
  userOneId,
  userOne,
  userTwo,
  roomOne,
  roomTwo,
  roomeOnePicID,

  setUpDatabase,
} = require("./fixtures/db");

beforeEach(setUpDatabase);

test("should create a task", async () => {
  const testtask = {
    heading: "blabalbal",
    discription: "i dont ",
  };

  const response = await request(app)
    .post("/api/tasks/" + roomOne.name)
    .set("Cookie", "auth_token=" + userOne.tokens[0].token)
    .send(testtask)
    .expect(201);

  const id = response.body._id;
  const ria = response.body;

  const task = await Task.findOne({ _id: id });

  console.log(task);
  expect(ria.heading).toBe(task.heading);
});

test("should not create a task", async () => {
  const testtask = {};

  const response = await request(app)
    .post("/api/tasks/" + roomOne.name)
    .set("Cookie", "auth_token=" + userOne.tokens[0].token)
    .send(testtask)
    .expect(400);
});

test("should edit a task", () => {});
