import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import { router as api } from "./routes/api.js";

const port = 3005;

const app = express();
app.use(cors());
app.use(express.static(path.join(path.resolve(), "dist")));

app.use(bodyParser.json());

app.use("/server", api);

app.listen(port, function () {
  console.log("Server running on localhost:" + port);
});
