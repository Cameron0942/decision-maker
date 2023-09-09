import dotenv from "dotenv";
dotenv.config();
import express, { json } from "express";
import cors from "cors";
import path from "path";

//? EXPRESS
import { fileURLToPath } from "url";
const app = express();

//? MONGODB
import mongoose from "mongoose";
// const { connect, connection } = mongoose;
const { connect } = mongoose;
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

// Get the directory path using import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// // eslint-disable-next-line no-undef
// app.use(express.static(path.join(__dirname, "dist")));

app.use(express.static(path.resolve(__dirname, '../dist')));

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
// connection.once("open", () => {
//   console.log(`MongoDB is running on port: ${MONGODB_PORT}`);
// });

//* ROUTES
app.use("/decision", postRouter);
app.use("/decision", getRouter);

app.listen(SERVER_PORT, () =>
  console.log(`Server is running on port ${SERVER_PORT}`)
);

// app.listen(MONGODB_PORT, () =>
//   console.log(`MongoDB is running on port ${MONGODB_PORT}`)
// );

//Connect to the database before listening
connectDB().then(() => {
  app.listen(MONGODB_PORT, () => {
      console.log(`MongoDB is running on port ${MONGODB_PORT}`);
  })
})

// app.get("/", (req, res) => {
//   res.sendFile(
//     path.resolve(__dirname, "../", "dist", "index.html")
//   );
//   // res.send("Request receieved!")
// });

app.use('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../dist/index.html'));
});