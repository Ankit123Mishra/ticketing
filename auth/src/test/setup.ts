import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { app } from "../app";

declare global {
  var signin: () => Promise<string[]>;
}

let mongod: any;

beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  process.env.JWT_KEY = "asdfj";
  const uri = mongod.getUri();
  await mongoose.connect(uri);
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let c of collections) {
    await c.deleteMany({});
  }
});

afterAll(async () => {
  await mongod.stop();
});

global.signin = async () => {
  const email = "test@test.com";
  const password = "apssword";

  const response = await request(app)
    .post("/api/users/signup")
    .send({
      email,
      password,
    })
    .expect(201);

  const cookie = response.get("Set-Cookie");

  return cookie;
};
