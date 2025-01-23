import { Router } from "express";


export const srouter = Router();
srouter.get('/login', (req, res) => {
  const { email, password } = req.query;
  res.send({ email:email, password:password });
});

srouter.get('/signup', (req, res) => {

});

srouter.post('/login', (req, res) => {
    
});