import  Express  from "express";
import cors from "cors";
import { srouter } from "./routes/v1/login-sing up";
import { roomRouter } from "./routes/v1/room";
import { saveRouter } from "./routes/v1/save";

const app = Express();
app.use(cors(
    {
        origin: "*"
    }
));

app.use('/api/v1/login-signup', srouter);
app.use('/api/v1/room', roomRouter);
app.use('/api/v1/save', saveRouter);


app.listen(3000, () => {
    console.log("Server running on port 3000");
});