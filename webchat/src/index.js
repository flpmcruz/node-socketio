import path from "path";
import { createServer } from "http";
import express from "express";
import cookieParser from "cookie-parser";
import realTimeServer from "./realTimeServer.js";
import { appRoutes } from "./routes/index.js";

const app = express();
const httpServer = createServer(app);

app.set("port", process.env.PORT || 3000);
app.set("views", path.join(path.resolve(), "src/views"));

app.use(cookieParser());
app.use(appRoutes(express));
app.use(express.static(path.join(path.resolve(), "src/public")));

httpServer.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`);
});

realTimeServer(httpServer);
