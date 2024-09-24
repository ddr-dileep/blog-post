import express from "express";
import rootRouter from "./routes/root.router";

const app = express();
const port = 8080;

app.use(express.json());
app.use("/api/v1", rootRouter); // all routes

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
