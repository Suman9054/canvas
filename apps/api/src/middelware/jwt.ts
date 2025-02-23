import jwt from 'jsonwebtoken';


export const jwttoken = (id: string,name:string) => {
  return jwt.sign({ id ,name}, process.env.JWT_SECRET as string, );
}

export const jwtverify = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET as string);
}