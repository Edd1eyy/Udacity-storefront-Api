import express, { Request, Response } from "express";
import { User, UserStore } from "../models/user";
import jwt, { Secret } from "jsonwebtoken";
import verifyAuthToken from "../midWare/tokenVerification";
import { OrderStore } from "../models/order";

const userStore = new UserStore();
const orderStore = new OrderStore();
let tokenSecret = process.env.TOKEN_SECRET as Secret;

const index = async (_req: Request, res: Response) => {
  const users = await userStore.index();
  res.json(users);
};

const show = async (req: Request, res: Response) => {
  const user = await userStore.show(req.body.id);
  res.json(user);
};

const create = async (req: Request, res: Response) => {
  const user: User = {
    username: req.body.username,
    password: req.body.password,
  };
  try {
    const newUser = await userStore.create(user.username, user.password);
    let token = jwt.sign({ user: newUser }, tokenSecret);
    res.json(token);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const authenticate = async (_req: Request, res: Response) => {
  const user: User = {
    username: _req.body.username,
    password: _req.body.password,
  };
  try {
    const u = await userStore.authenticate(user.username, user.password);
    let token = jwt.sign({ user: u }, tokenSecret);
    res.json(token);
  } catch (err) {
    res.status(401);
    res.json(err);
  }
};

const userOrders = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  if (id) {
    try {
      const allUserOrders = await orderStore.showUserOrders(id);
      res.json(allUserOrders);
    } catch (err) {
      res
        .status(500)
        .send(`Couldn't list all user orders, Err: ${(err as Error).message}`);
    }
  } else res.sendStatus(404);
};
const userRoutes = (app = express()): void => {
  app.get("/users", index);
  app.get("/users/:id", show);
  app.get("/users/:id/orders", userOrders);
  app.post("/users", create);
  app.post("/users/authenticate", authenticate);
};

export default userRoutes;
