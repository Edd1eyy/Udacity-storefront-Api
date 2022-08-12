import express, { Request, Response } from "express";
import { OrderStore } from "../models/order";
import verifyAuthToken from "../midWare/tokenVerification";

const store = new OrderStore();

const index = async (_req: Request, res: Response): Promise<void> => {
  const orders = await store.index();
  res.json(orders);
};

const show = async (req: Request, res: Response): Promise<void> => {
  const order = await store.show(req.body.id);
  res.json(order);
};

const create = async (req: Request, res: Response): Promise<void> => {
  const user_id: number = parseInt(req.body.user_id);
  try {
    if (user_id && user_id > 0) {
      const newOrder = await store.create(req.body.user_id);
      if (newOrder) res.json(newOrder);
      else res.sendStatus(400);
    } else res.sendStatus(400).send("bad request");
  } catch (err) {
    res.status(500);
    res.json(err);
  }
};

const orderProduct = async (req: Request, res: Response): Promise<void> => {
  const order_id: number = parseInt(req.params.order_id);
  const product_id: number = parseInt(req.body.product_id);
  const quantity: number = parseInt(req.body.quantity);
  try {
    if (
      order_id &&
      order_id > 0 &&
      product_id &&
      product_id > 0 &&
      quantity > 0
    ) {
      const newOrderProduct = await store.addOrderProduct(
        order_id,
        product_id,
        quantity
      );
      if (newOrderProduct) res.json(newOrderProduct);
      else res.sendStatus(400);
    } else res.sendStatus(400).send("bad request");
  } catch (err) {
    res.status(500);
    res.json(err);
  }
};

const statusUpdate = async (req: Request, res: Response) => {
  try {
    const order_id: number = parseInt(req.params.order_id);
    const status_complete: boolean = req.body.status_complete;

    if (
      order_id &&
      order_id > 0 &&
      "completed" in req.body &&
      typeof status_complete == "boolean"
    ) {
      const updatedOrder = await store.orderStatus(status_complete, order_id);
      if (updatedOrder) res.json(updatedOrder);
      else res.sendStatus(400);
    } else res.sendStatus(400).send("bad request");
  } catch (error) {
    res.status(500);
    res.json("Couldn't update");
  }
};

const destroy = async (req: Request, res: Response) => {
  const deleted = await store.delete(req.body.id);
  res.json(deleted);
};

const orderRoutes = (app = express()): void => {
  app.get("/orders", index);
  app.get("/orders/:id", show);
  app.post("/orders", create);
  app.post("/orders/:id/products", orderProduct);
  app.patch("/orders/:id", statusUpdate);
  app.delete("/orders", destroy);
};

export default orderRoutes;
