import express from "express";
import cors from "cors";
import { router } from "./routes/index.js";

const app = express();

app
  .use(cors({ origin: true }))
  .use(express.json())
  .use(router);

app.listen(3000, () => console.log("app set up on http://localhost:3000/"));
