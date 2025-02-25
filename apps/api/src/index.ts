import Express from "express";
import cors from "cors";
import "dotenv/config";
import { srouter } from "./routes/v1/login-sing up";
import { cloudinaryRouter } from "./routes/cloudnary";

const app = Express();
app.use(
  cors({
    origin: "*",
  }),
);
app.use(Express.json());
app.use("/api/v1/login-signup", srouter);
app.use("api/cloudinary", cloudinaryRouter);

app.listen(process.env.port, () => {
  console.log(`Server running on http://localhost:${process.env.port}`);
});
