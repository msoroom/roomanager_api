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
  taskOne,

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

test("should find tasks where the user is the resolver", async () => {
  const response = await request(app)
    .get("/api/tasks/related?sortBy=desc&mode=r&limit=10")
    .set("Cookie", "auth_token=" + userOne.tokens[0].token)
    .send()
    .expect(200);

  expect(response.body[0]._id).toBe(String(taskOne._id));
  expect(response.body[0].discription).toBe(taskOne.discription);
});

test("should find tasks where the user is the Creator", async () => {
  const response = await request(app)
    .get("/api/tasks/related?sortBy=desc&mode=c&limit=10")
    .set("Cookie", "auth_token=" + userTwo.tokens[0].token)
    .send()
    .expect(200);

  expect(response.body[0]._id).toBe(String(taskOne._id));
  expect(response.body[0].discription).toBe(taskOne.discription);
});

test("should not find tasks where the user is the resolver", async () => {
  const response = await request(app)
    .get("/api/tasks/related?sortBy=desc&mode=r&limit=10")
    .set("Cookie", "auth_token=" + userTwo.tokens[0].token)
    .send()
    .expect(200);

  expect(response.body).toEqual([]);
});

test("should not find tasks where the user is the Creator", async () => {
  const response = await request(app)
    .get(
      "/api/tasks/related?sortBy=desc&mode=c&limit=10&match=" + taskOne.heading
    )
    .set("Cookie", "auth_token=" + userOne.tokens[0].token)
    .send()
    .expect(200);

  expect(response.body).toEqual([]);
});

test("should find tasks where the user is the resolver and the heading is equal", async () => {
  const response = await request(app)
    .get(
      "/api/tasks/related?sortBy=desc&mode=r&limit=10&match=" + taskOne.heading
    )
    .set("Cookie", "auth_token=" + userOne.tokens[0].token)
    .send()
    .expect(200);

  expect(response.body[0]._id).toBe(String(taskOne._id));
  expect(response.body[0].discription).toBe(taskOne.discription);
});

test("should find tasks where the user is the Creator and the heading is equal", async () => {
  const response = await request(app)
    .get(
      "/api/tasks/related?sortBy=desc&mode=c&limit=10&match=" + taskOne.heading
    )
    .set("Cookie", "auth_token=" + userTwo.tokens[0].token)
    .send()
    .expect(200);

  expect(response.body[0]._id).toBe(String(taskOne._id));
  expect(response.body[0].discription).toBe(taskOne.discription);
});

test("should not find tasks where the user is the resolver and the match does not equal", async () => {
  const response = await request(app)
    .get("/api/tasks/related?sortBy=desc&mode=r&limit=10&match=SOMESTUPIDSHIT")
    .set("Cookie", "auth_token=" + userTwo.tokens[0].token)
    .send()
    .expect(200);

  expect(response.body).toEqual([]);
});

test("should not find tasks where the user is the Creator and the match does not equal", async () => {
  const response = await request(app)
    .get("/api/tasks/related?sortBy=desc&mode=c&limit=10&match=SOMESTUPIDSHIT")
    .set("Cookie", "auth_token=" + userOne.tokens[0].token)
    .send()
    .expect(200);

  expect(response.body).toEqual([]);
});
