import dotenv from "dotenv";
dotenv.config();

import express, { json } from "express";
import cors from "cors";
const app = express();
// import path from 'path';

//? MONGODB
import mongoose from "mongoose";
const { connect, connection } = mongoose;
mongoose.set("strictQuery", false); //stops console warnings

//? PORTS
// eslint-disable-next-line no-undef
const MONGODB_PORT = process.env.MONGODB_PORT || 7000;
// eslint-disable-next-line no-undef
const SERVER_PORT = process.env.SERVER_PORT || 5000;

//? ROUTERS
import postRouter from "./routers/postRouter.js";
import getRouter from "./routers/getRouter.js";

app.use(json());
app.use(cors());

// app.use(express.static(path.join(__dirname, 'build')));

// eslint-disable-next-line no-undef
const mongodbURI = process.env.MONGODB_URI;
const connectDB = async () => {
  try {
    await connect(mongodbURI);
  } catch (error) {
    console.log("Problem connecting to MongoDB", error);
    // eslint-disable-next-line no-undef
    process.exit(1);
  }
};

connectDB();
connection.once("open", () => {
  console.log(`MongoDB is running on port: ${MONGODB_PORT}`);
});

//* ROUTES
app.use("/decision", postRouter);
app.use("/decision", getRouter);

app.listen(SERVER_PORT, () =>
  console.log(`Server is running on port ${SERVER_PORT}`)
);
