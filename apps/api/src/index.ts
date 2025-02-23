import Express from "express";
import cors from "cors";
import 'dotenv/config';
import { srouter } from "./routes/v1/login-sing up";
import { roomRouter } from "./routes/v1/room";
import { saveRouter } from "./routes/v1/save";
import { cloudinaryRouter } from "./routes/cloudnary";
import { compare, incript } from "./middelware/incript";

const app = Express();
app.use(
  cors({
    origin: "*",
  }),
);
app.use(Express.json());
app.use("/api/v1/login-signup", srouter);
app.use("/api/v1/room", roomRouter);
app.use("/api/v1/save", saveRouter);
app.use("api/cloudinary", cloudinaryRouter);


app.listen(process.env.port, () => {
  console.log(`Server running on http://localhost:${process.env.port}`);
});
