import express from "express";
import rootRouter from "./routes/root.router";
import databaseConnection from "./configs/dbConfig";
import { config } from "dotenv";
config();

const app = express();
const port = process.env.APP_PORT || 8000;

app.use(express.json());
app.use("/api/v1", rootRouter); // all routes

app.listen(port, () => {
  databaseConnection(); // database connection
  console.log(`server is running on the port http://localhost:${port}`);
});
