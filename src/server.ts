import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import userRoutes from "./handlers/users";
import productRoutes from "./handlers/products";
import orderRoutes from "./handlers/orders";

const app = express();
const address: string = "localhost:3000";

app.use(bodyParser.json());

app.get("/", function (_req: Request, res: Response) {
  res.send("Hello World!");
});

userRoutes(app);
productRoutes(app);
orderRoutes(app);

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});
