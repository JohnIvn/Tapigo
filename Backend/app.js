import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import signInRoute from "./Routes/signInRoutes.js";
import signUpRoute from "./Routes/signUpRoutes.js";
import newsletterRoute from "./Routes/newsletterRoute.js";
import db from "./database.js";

dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/signin", signInRoute);
app.use("/signup", signUpRoute);
app.use("/newsletter", newsletterRoute);

async function initializeApp() {
  try {
    const server = app.listen(process.env.PORT, () => {
      console.log(`App is listening on port: ${process.env.PORT}`);
    });
  } catch (error) {
    console.error("Error initializing the application:", error);
    process.exit(1);
  }
}

initializeApp();
