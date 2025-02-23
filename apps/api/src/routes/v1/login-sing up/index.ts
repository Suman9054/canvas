import { Router, Request, Response } from "express";
import client from "@repo/db/src/db";
import { compare } from "../../../middelware/incript";

export const srouter = Router();
srouter.get("/login",async (req: Request, res: Response) => {
  try{const { email, password } = req.query;
   if (!email || !password) {
    res.status(400).send("email and password are required");
    return;
   }
   
   const user = await client.user.findFirst({
    where: {
      email: email as string,
    },
   });
    if (!user) {
      res.status(404).send("user not found");
      return;
    }
    // compare password
    const isPasswordValid = await compare(password as string, user.password);
    if (isPasswordValid === false) {
      res.status(400).send("password is incorrect");
      return;
    }else{
      res.json(user);
    }
}catch(e: any){
  res.status(400).send(e.message);  }
});

srouter.get("/signup", (req, res) => {
  const { email, password, name } = req.query;
  if (!email || !password || !name) {
    res.status(400).send("email, password and name are required");
    return;
  }
   
});

srouter.post("/login", (req, res) => {});
