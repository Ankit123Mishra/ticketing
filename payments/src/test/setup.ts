import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { app } from "../app";
import jwt from "jsonwebtoken";

declare global {
  var signin: (id?: string) => string[];
}

jest.mock("../nats-wrapper");

process.env.STRIPE_KEY =
  "sk_test_51KdaiiGw8UGZvEdA0YltN2UsX0sI3TwvQzK1rxvMCGjTMYCJCnY4VCxbej70zrdUAfsG0j64rdkcedOHAqqXEGE1002t8zJK7A";

let mongod: any;

beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  process.env.JWT_KEY = "asdfj";
  process.env.MONGO_URI = "";
  const uri = mongod.getUri();
  await mongoose.connect(uri);
});

beforeEach(async () => {
  jest.clearAllMocks();
  const collections = await mongoose.connection.db.collections();

  for (let c of collections) {
    await c.deleteMany({});
  }
});

afterAll(async () => {
  await mongod.stop();
});

global.signin = (id?: string) => {
  // Build a JWT payload. {id, email}
  const payload = {
    id: id || new mongoose.Types.ObjectId().toHexString(),
    email: "test@test.com",
  };

  // Create the JWT
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  // Build Session Object. { jwt: 'MY_JWT' }
  const session = { jwt: token };

  // Turn that session into JSON
  const sessionJSON = JSON.stringify(session);

  // Take JSON and encode it as base64
  const base64 = Buffer.from(sessionJSON).toString("base64");

  // return a string thats the cookie with the encoded data
  return [`session=${base64}`];
};
