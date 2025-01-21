import { Router } from "express";


export const srouter = Router();
srouter.get('/login', (req, res) => {
  console.log(req.body);
    res.send('Login');
});

srouter.get('/signup', (req, res) => {

});