import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

let tokenSecret = process.env.TOKEN_SECRET as jwt.Secret;

const verifyAuthToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authorizationHeader = req.headers.authorization as string;
    const token = authorizationHeader.split(" ")[1];
    jwt.verify(token, tokenSecret);

    next();
  } catch (error) {
    res.status(401);
    res.json("Access denied, invalid token");
    return;
  }
};

export default verifyAuthToken;
