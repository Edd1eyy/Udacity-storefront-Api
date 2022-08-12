import Client from "../database";

export type Order = {
  id?: number;
  user_id: string;
  status_complete: boolean;
};

export type OrderProduct = {
  id?: number;
  order_id: number;
  product_id: number;
  quantity: number;
};

export class OrderStore {
  async index(): Promise<Order[]> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * FROM orders";
      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get orders. Error: ${err}`);
    }
  }

  async show(id: string): Promise<Order> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * FROM orders WHERE id=($1)";
      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find order ${id}. Error: ${err}`);
    }
  }

  async create(user_id: string): Promise<Order | null> {
    try {
      const conn = await Client.connect();
      const sql = "INSERT INTO orders (user_id) VALUES($1) RETURNING *";
      const result = await conn.query(sql, [user_id]);
      const user = result.rows[0];

      conn.release();

      return user;
    } catch (err) {
      const wrongIdErrMessage =
        'violates foreign key constraint "orderss_user_id_fkey"';
      if ((err as Error).message.includes(wrongIdErrMessage)) return null;

      throw new Error(`unable create order for user(${user_id}): ${err}`);
    }
  }

  async showUserOrders(user_id: string): Promise<Order[] | null> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * FROM orders WHERE user_id=$1";
      const result = await conn.query(sql, [user_id]);

      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(
        `Couldn't get orders for user: ${user_id}, Err: ${
          (err as Error).message
        }`
      );
    }
  }

  async addOrderProduct(
    order_id: number,
    product_id: number,
    quantity: number
  ): Promise<Order[]> {
    try {
      const conn = await Client.connect();
      const sql =
        "INSERT INTO order_products ( order_id, product_id, quantity,) VALUES($1, $2, $3) RETURNING *";
      const result = await conn.query(sql, [order_id, product_id, quantity]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not add product ${product_id} to order ${order_id}: Err: ${
          (err as Error).message
        }`
      );
    }
  }

  async orderStatus(status_complete: boolean, id: number): Promise<Order[]> {
    try {
      const conn = await Client.connect();
      const sql = "UPDATE orders set completed =$1 WHERE id=$2 RETURNING *";
      const result = await conn.query(sql, [status_complete, id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not update order number: ${id} Err: ${(err as Error).message}`
      );
    }
  }
  async delete(id: string): Promise<Order> {
    try {
      const conn = await Client.connect();
      const sql = "DELETE FROM orders WHERE id=($1)";
      const result = await conn.query(sql, [id]);
      const order = result.rows[0];

      conn.release();

      return order;
    } catch (err) {
      throw new Error(`Could not delete order ${id}. Error: ${err}`);
    }
  }
}
