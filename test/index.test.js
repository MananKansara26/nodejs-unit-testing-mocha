const sinon = require("sinon");
const request = require("supertest");
const User = require("../user.model");
const app = require("../app");

let expect;

describe("API testing...", () => {
  before(async function () {
    ({ expect } = await import("chai")); // Use dynamic import
  });

  beforeEach(() => {
    sinon.stub(User, "create").callsFake((query) => {
      return Promise.resolve({ _id: "680cae2848fa6bf60dc328f2", ...query });
    });

    sinon.stub(User, "find").resolves([
      {
        _id: "680cae2848fa6bf60dc328f2",
        username: "Manan",
        password: "manan",
        __v: 0,
      },
    ]);

    // If you use callsFake(), you control the logic. If you use resolves(), you fix the return value.
    sinon.stub(User, "findOne").callsFake((query, selection) => {
      if (query.username === "Manan" && query.password === "manan") {
        if (selection?.password === 0) {
          return Promise.resolve({
            _id: "680cae2848fa6bf60dc328f2",
            username: "Manan",
            __v: 0,
          });
        } else {
          return Promise.resolve({
            _id: "680cae2848fa6bf60dc328f2",
            username: "Manan",
            password: "manan",
            __v: 0,
          });
        }
      }
      if (query._id === "680cae2848fa6bf60dc328f2") {
        if (selection?.password === 0) {
          return Promise.resolve({
            _id: "680cae2848fa6bf60dc328f2",
            username: "Manan",
            __v: 0,
          });
        } else {
          return Promise.resolve({
            _id: "680cae2848fa6bf60dc328f2",
            username: "Manan",
            password: "manan",
            __v: 0,
          });
        }
      }
      return Promise.resolve(null);
    });
  });

  afterEach(() => {
    sinon.restore();
  });

  describe("API /register", () => {
    it("should add user", async () => {
      const response = await request(app)
        .post("/register")
        .send({ username: "Manan", password: "manan" });

      expect(
        User.create.calledWithExactly({ username: "Manan", password: "manan" })
      ).to.be.true;
      expect(User.create.calledOnce).to.be.true;

      expect(response.status).to.equal(201);
      expect(response.body).to.be.an("object");

      expect(response.body).to.have.property("username");
      expect(response.body.username).to.be.an("string");

      expect(response.body).to.not.have.property("password");
    });

    it("should return error if username or password is not present", async () => {
      const response = await request(app)
        .post("/register")
        .send({ username: "Manan" });

      expect(response.status).to.equal(400);
      expect(response.body).to.be.an("object");

      expect(response.body).to.have.property("message");
      expect(response.body.message).to.be.an("string");
      expect(response.body.message).to.equal(
        "Username and password are required."
      );
    });
  });

  describe("API /login", () => {
    it("should return user if credentials is correct", async () => {
      const response = await request(app)
        .post("/login")
        .send({ username: "Manan", password: "manan" });

      expect(response.status).to.equal(200);
      expect(response.body).to.be.an("object");

      expect(response.body).to.have.property("username");
      expect(response.body.username).to.be.an("string");

      expect(response.body).to.not.have.property("password");
    });

    it("should return error if credentials is not correct", async () => {
      const response = await request(app)
        .post("/login")
        .send({ username: "Manan", password: "wrong" });

      expect(response.status).to.equal(401);
      expect(response.body).to.be.an("object");

      expect(response.body).to.have.property("message");
      expect(response.body.message).to.be.an("string");
      expect(response.body.message).to.equal("Invalid credentials.");
    });

    it("should return error if username or password is not present", async () => {
      const response = await request(app)
        .post("/login")
        .send({ username: "Manan" });

      expect(response.status).to.equal(400);
      expect(response.body).to.be.an("object");

      expect(response.body).to.have.property("message");
      expect(response.body.message).to.be.an("string");
      expect(response.body.message).to.equal(
        "Username and password are required."
      );
    });
  });

  describe("API /users", () => {
    it("should return users list", async () => {
      const response = await request(app).get("/users");

      expect(response.status).to.equal(200);
      expect(response.body).to.be.an("array");
    });
  });

  describe("API /users/:id", () => {
    it("should return user if exists", async () => {
      const response = await request(app).get(
        "/users/680cae2848fa6bf60dc328f2"
      );

      expect(response.status).to.equal(200);
      expect(response.body).to.be.an("object");

      expect(response.body).to.have.property("username");
      expect(response.body.username).to.be.an("string");

      expect(response.body).to.not.have.property("password");
    });

    it("should return error if user does not exists", async () => {
      const response = await request(app).get(
        "/users/680cae2848fa6bf60dc328w2"
      );

      expect(response.status).to.equal(404);
      expect(response.body).to.be.an("object");

      expect(response.body).to.have.property("message");

      expect(response.body.message).to.equal("User not found.");
    });
  });

  describe("Invalid route", () => {
    it("should return error", async () => {
      const response = await request(app).get("/invalid");

      expect(response.status).to.equal(404);

      expect(response.body).to.have.property("message");
      expect(response.body.message).to.be.an("string");
      expect(response.body.message).to.equal("Invalid route.");
    });
  });
});
