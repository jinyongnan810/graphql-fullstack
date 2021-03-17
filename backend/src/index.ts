import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import { app } from "./app";
const start = async () => {
  console.log("Backend starting...");
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY not set.");
  }
  try {
    await mongoose.connect(
      `mongodb+srv://jinyongnan:${process.env.MONGO_PWD}@cluster0.xk5om.gcp.mongodb.net/graphql-fullstack?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      }
    );
    console.log("DB connected.");
  } catch (error) {
    console.log(error.messsage);
  }

  app.listen(4000, async () => {
    console.log("Server listening on port 4000.");
  });
};

start();
