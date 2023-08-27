import dotenv from 'dotenv';
dotenv.config();

import express, { json } from 'express';
const app = express();
import cors from "cors";
// import path from 'path';

//? MONGODB
import mongoose from 'mongoose';
const { connect, connection } = mongoose;

//? PORTS
const MONGODB_PORT = 7000;
const SERVER_PORT = 5000;

//? ROUTERS
import postRouter from './routers/postRouter.js';
import getRouter from './routers/getRouter.js';

app.use(json());
app.use(cors());

// app.use(express.static(path.join(__dirname, 'build')));

// eslint-disable-next-line no-undef
const mongodbURI = process.env.MONGODB_URI;
connect(mongodbURI);


//* ROUTES
app.use("/decision", postRouter);
app.use("/decision", getRouter);

connection.once("open", () => {
    console.log(`MongoDB is running on port: ${MONGODB_PORT}`);
});

app.listen(SERVER_PORT, () => console.log(`Server is running on port ${SERVER_PORT}`));