import jwt from "jsonwebtoken";

export const jwttoken = (id: string, name: string) => {
  return jwt.sign({ id, name }, process.env.JWT_SECRET as string, {
    expiresIn: "24h",
  });
};

export const jwtverify = (token: string) => {
  try {
    jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
      if (err) {
        return false;
      } else {
        return decoded;
      }
    });
  } catch (e) {
    return false;
  }
};
