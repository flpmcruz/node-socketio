import path from "path";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";

export const appRoutes = (express) => {
  const router = express.Router();

  router.get("/", isLoggedIn, (req, res) => {
    res.sendFile(path.join(path.resolve(), "src/views/index.html"));
  });
  router.get("/register", (req, res) => {
    res.sendFile(path.join(path.resolve(), "src/views/register.html"));
  });

  return router;
};
