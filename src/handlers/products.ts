import express, { Request, Response } from "express";
import verifyAuthToken from "../midWare/tokenVerification";
import { Product, ProductStore } from "../models/product";

const store = new ProductStore();

const index = async (_req: Request, res: Response) => {
  const products = await store.index();
  res.json(products);
};

const show = async (req: Request, res: Response) => {
  const product = await store.show(req.body.id);
  res.json(product);
};

const create = async (req: Request, res: Response) => {
  const product: Product = {
    name: req.body.name,
    price: req.body.price,
  };
  try {
    const newProduct = await store.create(product.name, product.price);
    res.json(newProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const productRoutes = (app = express()): void => {
  app.get("/products", index);
  app.get("/products/:id", show);
  app.post("/products", create);
};

export default productRoutes;
