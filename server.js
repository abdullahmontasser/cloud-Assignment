import { config } from "dotenv";
import express from "express";
import mongoose, { model, Schema } from "mongoose";
import morgan from "morgan";
import router from "./routes/categoryRouter.js";
import { dbConnection } from "./config/database.js";

config({ path: "./.env" });

dbConnection();

const app = express();
app.use(express.json());

app.use(morgan('dev'))

app.use("/api/v1/categories", router);

const PORT = process.env.PORT || 3000; // Fallback to 3000 if PORT is undefined
app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`);
});
