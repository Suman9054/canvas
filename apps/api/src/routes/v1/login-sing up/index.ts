import { Router } from "express";
import client from "@repo/db";
import { compare, incript } from "../../../middelware/incript";
import { jwttoken, jwtverify } from "../../../middelware/jwt";

export const srouter = Router();
srouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

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
    } else {
      const token = jwttoken(user.id, user.name as string);
      res.cookie("auth_token", token).status(200).json(user.id);
    }
  } catch (e: any) {
    res.status(400).send(e.message);
  }
});

srouter.post("/signup", async (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password || !name) {
    res.status(400).send("email, password and name are required");
    return;
  }
  const hashedPassword = await incript(password as string);
  const as = await client.user.create({
    data: {
      email: email as string,
      password: hashedPassword,
      name: name as string,
    },
  });
  const token = jwttoken(as.id, name as string);
  res.cookie("auth_token", token).status(200).send("user created");
});

srouter.get("/auth", (req, res) => {
  const token = req.cookies.auth_token;
  if (!token) {
    res.status(401).send("unauthorized");
    return;
  }
  const decoded = jwtverify(token);
  if (decoded === false) {
    res.status(401).send("unauthorized");
  } else {
    res.status(200).send(decoded);
  }
});
